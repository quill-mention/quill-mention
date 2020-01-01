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

function hasValidMentionCharIndex(mentionCharIndex, text, isolateChar) {
  if (mentionCharIndex > -1) {
    if (
      isolateChar &&
      !(mentionCharIndex === 0 || !!text[mentionCharIndex - 1].match(/\s/g))
    ) {
      return false;
    }
    return true;
  }
  return false;
}

export {
  attachDataValues,
  getMentionCharIndex,
  hasValidChars,
  hasValidMentionCharIndex
};
