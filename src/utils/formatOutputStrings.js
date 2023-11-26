export function replaceUnderscoresAndCapitalize(inputString) {
  return inputString.replace(/_/g, " ").replace(/\w\S*/g, function (word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });
}
