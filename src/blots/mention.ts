import Quill from "quill";
import type { ScrollBlot, EmbedBlot } from "parchment";
const Embed = Quill.import("blots/embed") as typeof EmbedBlot;

class MentionEvent extends Event {
  public value: object;
  public event: Event;
  constructor(name: string, options: EventInit) {
    super(name, options);
    this.value = {};
    this.event = new Event(name);
  }
}

interface MentionBlotData {
  value: string;
  denotationChar: string;
}

function isMentionBlotData(data: unknown): data is MentionBlotData {
  return (
    typeof data === "object" &&
    data !== null &&
    "value" in data &&
    typeof data.value === "string" &&
    "denotationChar" in data &&
    typeof data.denotationChar === "string"
  );
}

class MentionBlot extends Embed {
  static blotName = "mention";
  static tagName = "span";
  static className = "mention";

  private hoverHandler?: EventListener;
  private clickHandler?: EventListener;
  private mounted: boolean;

  constructor(scroll: ScrollBlot, node: Node) {
    super(scroll, node);
    this.mounted = false;
  }

  static render?(data: MentionBlotData): HTMLElement;

  static create(data?: MentionBlotData) {
    const node = super.create();
    if (!isMentionBlotData(data) || node instanceof HTMLElement === false) {
      return node;
    }

    const denotationChar = document.createElement("span");
    denotationChar.className = "ql-mention-denotation-char";
    denotationChar.innerText = data.denotationChar;
    node.appendChild(denotationChar);

    if (typeof this.render === "function") {
      node.appendChild(this.render(data));
    } else {
      node.innerHTML += data.value;
    }

    return MentionBlot.setDataValues(node, data);
  }

  static setDataValues(element: HTMLElement, data: MentionBlotData) {
    const domNode = element;
    Object.keys(data).forEach((key) => {
      domNode.dataset[key] = data[key as keyof MentionBlotData];
    });
    return domNode;
  }

  static value(domNode: HTMLElement): any {
    return domNode.dataset;
  }

  attach() {
    super.attach();

    if (!this.mounted) {
      this.mounted = true;
      this.clickHandler = this.getClickHandler();
      this.hoverHandler = this.getHoverHandler();

      this.domNode.addEventListener("click", this.clickHandler, false);
      this.domNode.addEventListener("mouseenter", this.hoverHandler, false);
    }
  }

  detach() {
    super.detach();
    this.mounted = false;
    if (this.clickHandler) {
      this.domNode.removeEventListener("click", this.clickHandler);
      this.clickHandler = undefined;
    }
  }

  getClickHandler(): EventListener {
    return (e) => {
      const event = this.buildEvent("mention-clicked", e);
      window.dispatchEvent(event);
      e.preventDefault();
    };
  }

  getHoverHandler(): EventListener {
    return (e) => {
      const event = this.buildEvent("mention-hovered", e);
      window.dispatchEvent(event);
      e.preventDefault();
    };
  }

  private buildEvent(name: string, e: Event): MentionEvent {
    const event = new MentionEvent(name, {
      bubbles: true,
      cancelable: true,
    });
    event.value = Object.assign({}, (this.domNode as HTMLElement).dataset);
    event.event = e;
    return event;
  }
}

export { MentionBlot, MentionBlotData, isMentionBlotData, MentionEvent };
