import { useState, useRef } from "react";
import type { Recording } from "../types/Recording";
import { Modal } from "./Modal";
import { downloadRecordings } from "../utils/download";

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

  const downloadRecording = async () => {
    await downloadRecordings([recording]);
  };

  return (
    <>
      <div
        className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm flex items-center justify-between cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="overflow-y-hidden">
          <div className="text-xs text-gray-600 dark:text-gray-400 -mt-1 mb-1">
            {recording.timestamp.toLocaleString()}
          </div>
          <div className="text-lg dark:text-gray-100 truncate px-1">
            {recording.transcription}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="px-2 py-1 w-9 h-9 text-sm text-white rounded-lg bg-blue-500 hover:bg-blue-600 cursor-pointer">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0" />
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M15.0007 12C15.0007 13.6569 13.6576 15 12.0007 15C10.3439 15 9.00073 13.6569 9.00073 12C9.00073 10.3431 10.3439 9 12.0007 9C13.6576 9 15.0007 10.3431 15.0007 12Z"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M12.0012 5C7.52354 5 3.73326 7.94288 2.45898 12C3.73324 16.0571 7.52354 19 12.0012 19C16.4788 19 20.2691 16.0571 21.5434 12C20.2691 7.94291 16.4788 5 12.0012 5Z"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
            </svg>
          </button>

          <button
            className="px-2.5 py-2 w-9 h-9 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
            onClick={downloadRecording}
          >
            <svg
              className="fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
            </svg>
          </button>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Recording Details
          </h3>

          <div className="bg-gray-50 dark:bg-gray-700 dark:text-gray-200 p-4 rounded-lg">
            {recording.transcription}
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {recording.timestamp.toLocaleString()}
              {" - "}
              {(recording.blob.size / 1024).toFixed(2)} KB
            </div>
            <div className="flex items-center gap-2">
              <button
                className="px-2.5 py-2 w-9 h-9 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
                onClick={downloadRecording}
              >
                <svg
                  className="fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
                </svg>
              </button>
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
        </div>
      </Modal>
    </>
  );
};
