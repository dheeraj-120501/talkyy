import { useState } from "react";
import type { Phrase } from "../types/phrase";
import { Modal } from "./Modal";
import { PhraseItem } from "./PhraseItem";
import { AddPhraseForm } from "./AddPhraseForm";
import type { Language } from "../types/language";

interface PhraseListProps {
  phrases: Phrase[];
  language: Language;
  setPhrases: React.Dispatch<React.SetStateAction<Phrase[]>>;
}

export const PhraseList = ({
  phrases,
  setPhrases,
  language,
}: PhraseListProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const closeDialog = () => setIsDialogOpen(false);

  const deletePhrase = (phrase: Phrase) => {
    setPhrases((phrases) => {
      return phrases.filter((item) => item !== phrase);
    });
  };

  const addPhrase = (value: string, weight: number) => {
    setPhrases((phrases) => {
      return [
        ...phrases.filter(
          (phrase) => !(phrase.value === value && phrase.language === language),
        ),
        {
          value,
          weight,
          language,
        },
      ];
    });
  };

  return (
    <div className="w-11/12">
      <div className="flex justify-between">
        <h2 className="text-lg dark:text-gray-100 inline self-end">Phrases</h2>
        <button
          className="px-6 py-2 mb-0.5 rounded-3xl font-medium text-white bg-blue-500 hover:bg-blue-600"
          onClick={() => setIsDialogOpen(true)}
        >
          Add
        </button>
      </div>
      <div className="flex flex-wrap gap-2 max-h-45 overflow-auto bg-gray-200 dark:bg-gray-700 dark:text-gray-200 p-4 rounded-lg">
        {phrases.map((phrase, index) => (
          <PhraseItem key={index} phrase={phrase} deletePhrase={deletePhrase} />
        ))}
      </div>
      <Modal isOpen={isDialogOpen} onClose={closeDialog}>
        <AddPhraseForm addPhrase={addPhrase} closeDialog={closeDialog} />
      </Modal>
    </div>
  );
};
