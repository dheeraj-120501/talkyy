import { useState, useRef } from "react";
import type { Recording } from "../types/Recording";
import { Modal } from "./Modal";

interface RecordingItemProps {
  recording: Recording;
}

export const RecordingItem = ({ recording }: RecordingItemProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleCloseModal = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
    setIsModalOpen(false);
  };

  const playRecording = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(URL.createObjectURL(recording.blob));
      audioRef.current.onended = () => setIsPlaying(false);
    }
    audioRef.current.play();
    setIsPlaying(true);
  };

  return (
    <>
      <div
        className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm flex items-center justify-between cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
        onClick={() => setIsModalOpen(true)}
      >
        <span className="text-sm text-gray-600 dark:text-gray-300">
          {recording.timestamp.toLocaleString()}
        </span>
        <button className="px-3 py-1 text-sm text-white rounded bg-blue-600 cursor-pointer">
          View Recording
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Recording Details
          </h3>

          {/* <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            To Be Filled
          </div> */}

          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {recording.timestamp.toLocaleString()}
              {" - "}
              {(recording.blob.size / 1024).toFixed(2)} KB
            </div>
            <button
              onClick={playRecording}
              disabled={isPlaying}
              className={`px-4 py-2 rounded text-white ${
                isPlaying
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
              {isPlaying ? "Playing..." : "Play"}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};
