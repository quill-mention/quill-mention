"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setInnerContent = exports.hasValidMentionCharIndex = exports.hasValidChars = exports.getMentionCharIndex = exports.attachDataValues = void 0;
function attachDataValues(element, data, dataAttributes) {
    var mention = element;
    Object.keys(data).forEach(function (key) {
        if (dataAttributes.indexOf(key) > -1) {
            mention.dataset[key] = data[key];
        }
        else {
            delete mention.dataset[key];
        }
    });
    return mention;
}
exports.attachDataValues = attachDataValues;
function setInnerContent(element, value) {
    if (value === null)
        return;
    if (typeof value === "object")
        element.appendChild(value);
    else
        element.innerText = value;
}
exports.setInnerContent = setInnerContent;
function getMentionCharIndex(text, mentionDenotationChars, isolateChar, allowInlineMentionChar) {
    return mentionDenotationChars.reduce(function (prev, mentionChar) {
        var mentionCharIndex;
        if (isolateChar && allowInlineMentionChar) {
            var regex = new RegExp("^".concat(mentionChar, "|\\s").concat(mentionChar), "g");
            var lastMatch = (text.match(regex) || []).pop();
            if (!lastMatch) {
                return {
                    mentionChar: prev.mentionChar,
                    mentionCharIndex: prev.mentionCharIndex,
                };
            }
            mentionCharIndex =
                lastMatch !== mentionChar
                    ? text.lastIndexOf(lastMatch) +
                        lastMatch.length -
                        mentionChar.length
                    : 0;
        }
        else {
            mentionCharIndex = text.lastIndexOf(mentionChar);
        }
        if (mentionCharIndex > prev.mentionCharIndex) {
            return {
                mentionChar: mentionChar,
                mentionCharIndex: mentionCharIndex,
            };
        }
        return {
            mentionChar: prev.mentionChar,
            mentionCharIndex: prev.mentionCharIndex,
        };
    }, { mentionChar: null, mentionCharIndex: -1 });
}
exports.getMentionCharIndex = getMentionCharIndex;
function hasValidChars(text, allowedChars) {
    return allowedChars.test(text);
}
exports.hasValidChars = hasValidChars;
function hasValidMentionCharIndex(mentionCharIndex, text, isolateChar, textPrefix) {
    if (mentionCharIndex === -1) {
        return false;
    }
    if (!isolateChar) {
        return true;
    }
    var mentionPrefix = mentionCharIndex
        ? text[mentionCharIndex - 1]
        : textPrefix;
    return !mentionPrefix || !!mentionPrefix.match(/\s/);
}
exports.hasValidMentionCharIndex = hasValidMentionCharIndex;
