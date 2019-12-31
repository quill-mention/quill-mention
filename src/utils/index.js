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

function getMentionCharIndex(textBeforeCursor, mentionDenotationChars) {
  return mentionDenotationChars.reduce((prev, cur) => {
    const previousIndex = prev;
    const mentionIndex = textBeforeCursor.lastIndexOf(cur);

    return mentionIndex > previousIndex ? mentionIndex : previousIndex;
  }, -1);
}

function hasValidChars(text, allowedChars) {
  return allowedChars.test(text);
}

export { attachDataValues, getMentionCharIndex, hasValidChars };
