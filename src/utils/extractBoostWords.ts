const cleanWord = (word: string): string => {
  return word
    .replace(/^(\s|\.|\||\?|:|-)+/g, "")
    .replace(/(\s|\.|\||\?|:|-)+$/g, "")
    .toLowerCase();
};

export const extractBoostWords = (
  original: string,
  transcript: string,
): string[] => {
  const originalWords = original.split(" ").map((word) => cleanWord(word));
  const transcriptWords = transcript.split(" ").map((word) => cleanWord(word));

  return originalWords.filter(
    (word) => transcriptWords.findIndex((element) => element == word) == -1,
  );
};
