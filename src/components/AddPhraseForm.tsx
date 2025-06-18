import { useState } from "react";

interface AddPhraseFormProps {
  addPhrase: (value: string, boost: number) => void;
  closeDialog: () => void;
}

export const AddPhraseForm = ({
  addPhrase,
  closeDialog,
}: AddPhraseFormProps) => {
  const [phrase, setPhrase] = useState("");
  const [boost, setBoost] = useState(1);

  return (
    <div className="flex flex-col gap-5 px-10 items-center">
      <h2 className="text-2xl dark:text-gray-100 -mt-5 mb-3">Add Phrase</h2>
      <div className="flex w-10/12 gap-2">
        <label htmlFor="phrase" className="dark:text-gray-100 inline">
          Phrase
        </label>
        <input
          type="text"
          onChange={(e) => setPhrase(e.target.value)}
          className="px-2 py-1 dark:text-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 bg-gray-200 hover:bg-gray-300 rounded-md"
          id="phrase"
        />
      </div>
      <div className="flex w-10/12 gap-2">
        <label htmlFor="boost" className="dark:text-gray-100">
          Boost
        </label>
        <input
          type="range"
          onChange={(e) => setBoost(Number.parseFloat(e.target.value))}
          value={boost}
          min={0}
          max={20}
          step={0.01}
          id="boost"
        />
        <span className="dark:text-gray-100">{boost}</span>
      </div>

      <div className="flex justify-between w-10/12">
        <button
          onClick={closeDialog}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg inline-flex items-center"
        >
          Cancel
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg inline-flex items-center"
          onClick={() => {
            addPhrase(phrase, boost);
            closeDialog();
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};
