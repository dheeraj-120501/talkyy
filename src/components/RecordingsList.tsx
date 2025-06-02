import type { Recording } from "../types/Recording";
import { downloadRecordings } from "../utils/download";
import { RecordingItem } from "./RecordingItem";

interface RecordingsListProps {
  recordings: Recording[];
}

export const RecordingsList = ({ recordings }: RecordingsListProps) => {
  if (recordings.length === 0) return null;

  const downloadAll = () => {
    downloadRecordings(recordings);
  };

  return (
    <div className="w-full">
      <div className="w-full flex justify-between mb-2">
        <h2 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-200">
          Your Recordings
        </h2>
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
      <div className="space-y-3">
        {recordings.map((recording) => (
          <RecordingItem key={recording.id} recording={recording} />
        ))}
      </div>
    </div>
  );
};
