import type { Language } from "../types/language";
import type { Phrase } from "../types/phrase";
import type { Transcript } from "../types/transcript";
import { exportTranscripts } from "../utils/export";
import { TranscriptItem } from "./TranscriptItem";

interface TranscriptsListProps {
  transcripts: Transcript[];
  phrases: Phrase[];
  deleteTranscript: (
    id: string,
    userId: string,
    language: Language,
  ) => Promise<void>;
  deleteAllTranscripts: () => void;
}

export const TranscriptList = ({
  transcripts,
  phrases,
  deleteTranscript,
  deleteAllTranscripts: deleteAllTranscripts,
}: TranscriptsListProps) => {
  if (transcripts.length === 0) return null;

  const downloadAll = () => {
    exportTranscripts(transcripts, phrases);
  };

  return (
    <div className="w-full">
      <div className="flex w-full flex-row-reverse gap-2 mb-2">
        <button
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg inline-flex items-center"
          onClick={deleteAllTranscripts}
        >
          <svg
            className="fill-current w-4 h-4 mr-2"
            fill="#ffffff"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#ffffff"
          >
            <path d="M5.755,20.283,4,8H20L18.245,20.283A2,2,0,0,1,16.265,22H7.735A2,2,0,0,1,5.755,20.283ZM21,4H16V3a1,1,0,0,0-1-1H9A1,1,0,0,0,8,3V4H3A1,1,0,0,0,3,6H21a1,1,0,0,0,0-2Z"></path>
          </svg>
          <span>Delete all</span>
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg inline-flex items-center"
          onClick={downloadAll}
        >
          <svg
            className="fill-current w-4 h-4 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
          </svg>
          <span>Download all</span>
        </button>
      </div>
      <div className="max-h-96 overflow-y-auto">
        <div className="flex flex-col gap-1.5">
          {transcripts.map((transcript) => (
            <TranscriptItem
              key={transcript.id}
              transcript={transcript}
              phrases={phrases}
              deleteTranscript={deleteTranscript}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
