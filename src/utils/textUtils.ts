export function getWordSlice(text: string, range: [number, number]) {
  const words = text.split(/\s+/);
  const [start, end] = range;

  const highlightedWords = words.slice(start, end);
  const beforeWords = words.slice(0, start);
  const afterWords = words.slice(end);

  return {
    before: beforeWords.join(" "),
    highlight: highlightedWords.join(" "),
    after: afterWords.join(" "),
  };
}
