import type { Phrase } from "../types/phrase";

interface PhraseItemProps {
  phrase: Phrase;
  deletePhrase: (phrase: Phrase) => void;
}

export const PhraseItem = ({ phrase, deletePhrase }: PhraseItemProps) => {
  return (
    <button
      className="bg-gray-300 hover:bg-gray-400 dark:text-gray-100 hover:text-red-400 dark:bg-gray-500 dark:hover:bg-gray-600 dark:hover:text-red-500 py-2 px-3 rounded-full"
      onClick={() => deletePhrase(phrase)}
    >
      <span>{`${phrase.value}:${phrase.weight}`}</span>
    </button>
  );
};
