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
  return mentionDenotationChars.reduce((previousMentionIndex, mentionChar) => {
    const mentionIndex = text.lastIndexOf(mentionChar);

    return mentionIndex > previousMentionIndex
      ? mentionIndex
      : previousMentionIndex;
  }, -1);
}

function hasValidChars(text, allowedChars) {
  return allowedChars.test(text);
}

export { attachDataValues, getMentionCharIndex, hasValidChars };
