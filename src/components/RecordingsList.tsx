import type { Recording } from "../types/recording";
import { RecordingItem } from "./RecordingItem";

interface RecordingsListProps {
  recordings: Recording[];
}

export const RecordingsList = ({ recordings }: RecordingsListProps) => {
  if (recordings.length === 0) return null;

  return (
    <div className="w-full">
      <h2 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-200">
        Your Recordings
      </h2>
      <div className="space-y-3">
        {recordings.map((recording) => (
          <RecordingItem key={recording.id} recording={recording} />
        ))}
      </div>
    </div>
  );
};
