import type { Recording } from "../types/recording";

interface RecordingItemProps {
  recording: Recording;
}

export const RecordingItem = ({ recording }: RecordingItemProps) => {
  const playRecording = () => {
    const audio = new Audio(URL.createObjectURL(recording.blob));
    audio.play();
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm flex items-center justify-between">
      <span className="text-sm text-gray-600 dark:text-gray-300">
        {recording.timestamp.toLocaleString()}
        {" - "}
        {(recording.blob.size / 1024).toFixed(2)} KB
      </span>
      <button
        onClick={playRecording}
        className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600"
      >
        Play
      </button>
    </div>
  );
};
