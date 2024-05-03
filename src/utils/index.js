function attachDataValues(element, data, dataAttributes) {
  const mention = element;
  Object.keys(data).forEach((key) => {
    if (dataAttributes.indexOf(key) > -1) {
      mention.dataset[key] = data[key];
    } else {
      delete mention.dataset[key];
    }
  });
  return mention;
}

function setInnerContent(element, value) {
  if (value === null) return;
  if (typeof value === "object") element.appendChild(value);
  else element.innerText = value;
}

function getMentionCharIndex(
  text,
  mentionDenotationChars,
  isolateChar,
  allowInlineMentionChar
) {
  return mentionDenotationChars.reduce(
    (prev, mentionChar) => {
      let mentionCharIndex;

      if (isolateChar && allowInlineMentionChar) {
        const regex = new RegExp(`^${mentionChar}|\\s${mentionChar}`, "g");
        const lastMatch = (text.match(regex) || []).pop();

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
      } else {
        mentionCharIndex = text.lastIndexOf(mentionChar);
      }

      if (mentionCharIndex > prev.mentionCharIndex) {
        return {
          mentionChar,
          mentionCharIndex,
        };
      }
      return {
        mentionChar: prev.mentionChar,
        mentionCharIndex: prev.mentionCharIndex,
      };
    },
    { mentionChar: null, mentionCharIndex: -1 }
  );
}

function hasValidChars(text, allowedChars) {
  return allowedChars.test(text);
}

function hasValidMentionCharIndex(
  mentionCharIndex,
  text,
  isolateChar,
  textPrefix
) {
  if (mentionCharIndex === -1) {
    return false;
  }

  if (!isolateChar) {
    return true;
  }

  const mentionPrefix = mentionCharIndex
    ? text[mentionCharIndex - 1]
    : textPrefix;

  return !mentionPrefix || !!mentionPrefix.match(/\s/);
}

export {
  attachDataValues,
  getMentionCharIndex,
  hasValidChars,
  hasValidMentionCharIndex,
  setInnerContent,
};
