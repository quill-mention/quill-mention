import './quill.mention.css';
// import './blots/mention';


class Mention {
  constructor(quill, options) {
    this.isOpen = false;
    this.menuItemIndex = 0;
    this.atPos = null;
    this.pattern = /^[a-zA-Z0-9_]*$/;
    this.values = [];

    this.quill = quill;
    this.jsonUrl = options.jsonUrl;
    this.defaultSuggestions = options.defaultSuggestions;
    this.maxLen = options.maxLen || 31;

    this.mentionContainer = document.createElement('div');
    this.mentionContainer.className = 'ql-mention-list-container';
    this.mentionContainer.style.cssText = 'display: none; position: absolute;';
    this.mentionContainer.innerHTML = '<ul id="ql-mention-list" class="ql-mention-list"></ul>';
    document.body.appendChild(this.mentionContainer);
    this.mentionList = document.getElementById('ql-mention-list');

    quill.on('text-change', this.onTextChange.bind(this));
    quill.on('selection-change', this.onSelectionChange.bind(this));

    quill.keyboard.addBinding({
      key: 9,
    }, this.selectHandler.bind(this));
    quill.keyboard.bindings[9].unshift(quill.keyboard.bindings[9].pop());

    quill.keyboard.addBinding({
      key: 13,
    }, this.selectHandler.bind(this));
    quill.keyboard.bindings[13].unshift(quill.keyboard.bindings[13].pop());

    quill.keyboard.addBinding({
      key: 27,
    }, this.escapeHandler.bind(this));

    quill.keyboard.addBinding({
      key: 38,
    }, this.upHandler.bind(this));

    quill.keyboard.addBinding({
      key: 40,
    }, this.downHandler.bind(this));
  }

  selectHandler() {
    if (this.isOpen) {
      this.selectMenuItem();
      return false;
    }
    return true;
  }

  escapeHandler() {
    if (this.isOpen) {
      this.hideMentionMenu();
      return false;
    }
    return true;
  }

  upHandler() {
    if (this.isOpen) {
      this.prevMenuItem();
      return false;
    }
    return true;
  }

  downHandler() {
    if (this.isOpen) {
      this.nextMenuItem();
      return false;
    }
    return true;
  }

  showMentionMenu() {
    this.mentionContainer.style.display = '';
    this.isOpen = true;
  }

  hideMentionMenu() {
    this.tryCancelToken();
    this.mentionContainer.style.display = 'none';
    this.isOpen = false;
  }

  highlightMenuItem() {
    for (let i = 0; i < this.mentionList.childNodes.length; i += 1) {
      this.mentionList.childNodes[i].classList.remove('selected');
    }
    this.mentionList.childNodes[this.menuItemIndex].classList.add('selected');
  }

  selectMenuItem() {
    const range = this.quill.getSelection();
    const { atPos } = this.atPos;
    const cursorPos = range.index;
    const { username } = this.mentionList.childNodes[this.menuItemIndex].dataset.username;
    const text = `@${username}`;
    this.quill.deleteText(atPos, cursorPos - atPos, this.quill.sources.API);
    this.quill.insertEmbed(atPos, 'mention', text, this.quill.sources.API);
    this.quill.insertText(atPos + 1, ' ', this.quill.sources.API);
    this.quill.setSelection(atPos + 2, this.quill.sources.API);
    this.hideMentionMenu();
  }

  onMenuItemClick(e) {
    e.stopImmediatePropagation();
    e.preventDefault();
    this.menuItemIndex = e.currentTarget.dataset.index;
    this.highlightMenuItem();
    this.selectMenuItem();
  }

  // TODO: Fix item
  renderItem(item) {
    this.mentionList.appendChild(item);
  }

  renderMenuList(data) {
    if (data && data.length > 0) {
      this.values = data;
      this.mentionList.innerHTML = '';
      for (let i = 0; i < data.length; i += 1) {
        const li = document.createElement('li');
        li.className = 'ql-mention-list-item';
        li.dataset.index = i;
        li.dataset.username = data[i].username;
        li.innerHTML = `<img src="${data[i].avatar}">${data[i].username} <small>(${data[i].status})</small>`;
        li.onclick = this.onMenuItemClick.bind(this);
        this.mentionList.appendChild(li);
      }
      this.menuItemIndex = 0;
      this.highlightMenuItem();
      this.showMentionMenu();
    } else {
      this.hideMentionMenu();
    }
  }

  getUsersAndRenderMentionMenu(input) {
    const url = this.jsonUrl;
    axios.get(url, {
      cancelToken: new this.CancelToken((c) => {
        this.cancel = c;
      }),
      params: {
        username: input,
      },
    })
      .then((response) => {
        const users = [];
        Object.keys(response.data).forEach((key) => {
          const user = response.data[key];
          users.push({ username: user.username, status: user.status, avatar: user.avatar });
        });
        this.renderMenuList(users);
      })
      .catch();
  }

  nextMenuItem() {
    this.menuItemIndex = (this.menuItemIndex + 1) % this.values.length;
    this.highlightMenuItem();
  }

  prevMenuItem() {
    this.menuItemIndex = ((this.menuItemIndex + this.values.length) - 1) % this.values.length;
    this.highlightMenuItem();
  }

  hasValidChars(s) {
    return this.pattern.test(s);
  }

  setMentionMenuPosition(startIndex) {
    const containerPos = this.quill.container.getBoundingClientRect();
    const indexPos = this.quill.getBounds(startIndex);
    this.mentionContainer.style.top = `${window.scrollY + containerPos.top + indexPos.bottom}px`;
    this.mentionContainer.style.left = `${window.scrollX + containerPos.left + indexPos.left}px`;
  }

  onSomethingChange() {
    const range = this.quill.getSelection();
    const cursorPos = range.index;
    const startPos = Math.max(0, cursorPos - this.maxLen);
    const beforeCursorPos = this.quill.getText(startPos, cursorPos - startPos);
    const atSignIndex = beforeCursorPos.lastIndexOf('@');
    if (atSignIndex > -1) {
      const atPos = cursorPos - (beforeCursorPos.length - atSignIndex);
      this.atPos = atPos;
      this.setMentionMenuPosition(atPos);
      const afterAtPos = atPos + 1;
      const textAfterAtPos = this.quill.getText(afterAtPos, cursorPos - afterAtPos);
      if (this.hasValidChars(textAfterAtPos)) {
        if (textAfterAtPos.length === 0) {
          this.renderMenuList(this.defaultSuggestions);
          this.tryCancelToken();
        } else {
          this.getUsersAndRenderMentionMenu(textAfterAtPos);
        }
      } else {
        this.hideMentionMenu();
      }
    } else {
      this.hideMentionMenu();
    }
  }

  onTextChange(delta, oldDelta, source) {
    if (source === 'user') {
      this.onSomethingChange();
    }
  }

  onSelectionChange(range) {
    if (range && range.length === 0) {
      this.onSomethingChange();
    } else {
      this.hideMentionMenu();
    }
  }
}

Quill.register('modules/mention', Mention);
