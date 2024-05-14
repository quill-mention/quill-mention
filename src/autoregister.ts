import Quill from "quill";
import "./blots/mention";
import { Mention, MentionBlot } from ".";

Quill.register({ "blots/mention": MentionBlot, "modules/mention": Mention });

export default Mention;
