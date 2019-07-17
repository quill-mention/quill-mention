import Quill from 'quill';

const Embed = Quill.import('blots/embed');


class MentionBlot extends Embed {
  static create(data) {
    const node = super.create();
    const denotationChar = document.createElement('span');
    denotationChar.className = 'ql-mention-denotation-char';
    denotationChar.innerHTML = data.denotationChar;
    node.appendChild(denotationChar);
    node.innerHTML += data.value;
    return MentionBlot.setDataValues(node, data);
  }

  static setDataValues(element, data) {
    const domNode = element;
    Object.keys(data).forEach((key) => {
      domNode.dataset[key] = data[key];
    });
    return domNode;
  }

  static value(domNode) {
    return domNode.dataset;
  }

  /**
   * Redefine the `update` method to handle the `childList` case.
   * This is necessary to correctly handle "backspace" on Android using Gboard.
   * It behaves differently than other cases and we need to handle the node
   * removal instead of the `characterData`.
   * 
   * https://github.com/quilljs/quill/issues/1985#issuecomment-387826451
   */
  update(mutations, context) {
    // `childList` mutations are not handled on Quill
    // see `update` implementation on:
    // https://github.com/quilljs/quill/blob/master/blots/embed.js

    mutations.forEach(mutation => {
      if (mutation.type != 'childList') return;
      if (mutation.removedNodes.length == 0) return;

      setTimeout(() => this._remove(), 0);
    });

    const unhandledMutations = mutations.filter(m => m.type != 'childList')
    super.update(unhandledMutations, context);
  }

  _remove() {
    // NOTE: call this function as:
    // setTimeout(() => this._remove(), 0);
    // otherwise you'll get the error: "The given range isn't in document."
    const cursorPosition = quill.getSelection().index - 1;

    // see `remove` implementation on:
    // https://github.com/quilljs/parchment/blob/master/src/blot/abstract/shadow.ts
    this.remove();

    // schedule cursor positioning after quill is done with whatever has scheduled
    setTimeout(() => quill.setSelection(cursorPosition, Quill.sources.API), 0);
  }
}

MentionBlot.blotName = 'mention';
MentionBlot.tagName = 'span';
MentionBlot.className = 'mention';

Quill.register(MentionBlot);
