import type { Recording } from "../types/recording";
import { downloadRecordings } from "../utils/download";
import { RecordingItem } from "./RecordingItem";

interface RecordingsListProps {
  recordings: Recording[];
  deleteRecording: (id: string) => void;
  deleteAllRecordings: () => void;
}

export const RecordingsList = ({
  recordings,
  deleteRecording,
  deleteAllRecordings,
}: RecordingsListProps) => {
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
        <div className="flex gap-2">
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
          <button
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg inline-flex items-center"
            onClick={deleteAllRecordings}
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
        </div>
      </div>
      <div className="space-y-3">
        {recordings.map((recording) => (
          <RecordingItem
            key={recording.id}
            recording={recording}
            deleteRecording={deleteRecording}
          />
        ))}
      </div>
    </div>
  );
};
