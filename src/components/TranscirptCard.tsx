import { useRef, useState } from "react";
import type { Transcript } from "../types/transcript";

interface TranscriptCardProps {
  transcript: Transcript;
  deleteCurrentTranscript: () => void;
  downloadTranscript: () => Promise<void>;
}

export function TranscriptCard({
  transcript,
  deleteCurrentTranscript,
  downloadTranscript,
}: TranscriptCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const questionAudioRef = useRef<HTMLAudioElement | null>(null);
  const answerAudioRef = useRef<HTMLAudioElement | null>(null);

  const playRecording = (
    audio: Blob,
    ref: React.RefObject<HTMLAudioElement | null>,
  ) => {
    if (!ref.current) {
      ref.current = new Audio(URL.createObjectURL(audio));
      ref.current.onended = () => setIsPlaying(false);
    }
    ref.current.play();
    setIsPlaying(true);
  };

  return (
    <div className="space-y-4">
      <div>
        <div className="flex justify-between mb-1 items-end">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Orignal Question
          </h3>
        </div>
        <div className="max-h-40 overflow-auto bg-gray-200 dark:bg-gray-700 dark:text-gray-200 p-4 rounded-lg">
          {transcript.originalQuestion}
        </div>
      </div>

      <div>
        <div className="flex justify-between mb-1 items-end">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Transcribed Question
          </h3>

          <button
            onClick={() =>
              playRecording(transcript.questionAudio, questionAudioRef)
            }
            disabled={isPlaying}
            className={`px-4 py-1.5 rounded text-white ${
              isPlaying
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {isPlaying ? "Playing..." : "Play"}
          </button>
        </div>
        <div className="max-h-40 overflow-auto bg-gray-200 dark:bg-gray-700 dark:text-gray-200 p-4 rounded-lg">
          {transcript.transcribedQuestion}
        </div>

        <div className="text-sm ml-1 text-gray-500 dark:text-gray-400">
          {(transcript.questionAudio.size / 1024).toFixed(2)} KB
        </div>
      </div>

      {transcript.answer && transcript.answerAudio && (
        <div>
          <div className="flex justify-between mb-1 items-end">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Answer
            </h3>

            <button
              onClick={() =>
                playRecording(transcript.answerAudio!, answerAudioRef)
              }
              disabled={isPlaying}
              className={`px-4 py-1.5 rounded text-white ${
                isPlaying
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
              {isPlaying ? "Playing..." : "Play"}
            </button>
          </div>
          <div className="max-h-40 overflow-auto bg-gray-200 dark:bg-gray-700 dark:text-gray-200 p-4 rounded-lg">
            {transcript.answer}
          </div>

          <div className="text-sm ml-1 text-gray-500 dark:text-gray-400">
            {(transcript.answerAudio.size / 1024).toFixed(2)} KB
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {transcript.timestamp.toLocaleString()}
        </div>
        <div className="flex items-center gap-2">
          <button
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-2 rounded-lg inline-flex items-center"
            onClick={deleteCurrentTranscript}
          >
            <svg
              className="fill-current w-4 h-4"
              fill="#ffffff"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#ffffff"
            >
              <path d="M5.755,20.283,4,8H20L18.245,20.283A2,2,0,0,1,16.265,22H7.735A2,2,0,0,1,5.755,20.283ZM21,4H16V3a1,1,0,0,0-1-1H9A1,1,0,0,0,8,3V4H3A1,1,0,0,0,3,6H21a1,1,0,0,0,0-2Z"></path>
            </svg>
          </button>

          <button
            className="px-2.5 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
            onClick={downloadTranscript}
          >
            <svg
              className="fill-current w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
