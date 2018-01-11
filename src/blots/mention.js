import Quill from 'quill';

const Embed = Quill.import('blots/embed');


class MentionBlot extends Embed {
  static create(value) {
    const node = super.create();
    node.innerHTML = value;
    node.dataset.username = value.replace('@', '');
    return node;
  }
}
MentionBlot.blotName = 'mention';
MentionBlot.tagName = 'MENTION';

Quill.register(MentionBlot);
