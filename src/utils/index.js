function attachDataValues(element, data, dataAttributes) {
  const mention = element;
  Object.keys(data).forEach(key => {
    if (dataAttributes.indexOf(key) > -1) {
      mention.dataset[key] = data[key];
    } else {
      delete mention.dataset[key];
    }
  });
  return mention;
}

function getMentionCharIndex(text, mentionDenotationChars) {
  return mentionDenotationChars.reduce(
    (prev, mentionChar) => {
      const mentionCharIndex = text.lastIndexOf(mentionChar);

      if (mentionCharIndex > prev.mentionCharIndex) {
        return {
          mentionChar,
          mentionCharIndex
        };
      }
      return {
        mentionChar: prev.mentionChar,
        mentionCharIndex: prev.mentionCharIndex
      };
    },
    { mentionChar: null, mentionCharIndex: -1 }
  );
}

function hasValidChars(text, allowedChars) {
  return allowedChars.test(text);
}

function hasValidMentionCharIndex(mentionCharIndex, text, isolateChar, textPrefix) {
  if (mentionCharIndex === -1) {
    return false;
  }

  if (!isolateChar) {
    return true;
  }

  const mentionPrefix = mentionCharIndex
    ? text[mentionCharIndex - 1]
    : textPrefix;

  return !mentionPrefix
      || !!mentionPrefix.match(/\s/);
}

export {
  attachDataValues,
  getMentionCharIndex,
  hasValidChars,
  hasValidMentionCharIndex
};
