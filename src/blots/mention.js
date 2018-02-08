const Embed = Quill.import('blots/embed');

class MentionBlot extends Embed {
  static create(data) {
    const node = super.create();
    const atSign = document.createElement('span');
    atSign.className = 'ql-mention-at-sign';
    atSign.innerHTML = '@';
    node.appendChild(atSign);
    node.innerHTML += data.value;
    node.dataset.id = data.id;
    node.dataset.value = data.value;
    return node;
  }

  static value(domNode) {
    return {
      id: domNode.dataset.id,
      value: domNode.dataset.value
    }
  }
}

MentionBlot.blotName = 'mention';
MentionBlot.tagName = 'MENTION';

Quill.register(MentionBlot);
