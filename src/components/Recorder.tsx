import { useState } from "react";
import RecordText from "./RecordText";
import { RecordingsList } from "./RecordingsList";
import type { RecordingPrompt } from "../types/RecordingPrompt";
import { getWordSlice } from "../utils/textUtils";
import { useAudioRecorder } from "../hooks/useAudioRecorder";

interface RecorderProps {
  recordingPrompts: RecordingPrompt[];
}

function Recorder({ recordingPrompts }: RecorderProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  const isCompleted = currentTextIndex >= recordingPrompts.length;
  const currentText = recordingPrompts[currentTextIndex].text;
  const currentRange: [number, number] = !isCompleted
    ? recordingPrompts[currentTextIndex].recordSpan
    : [0, 0];
  const { before, highlight, after } = !isCompleted
    ? getWordSlice(currentText, currentRange)
    : {
        before: "",
        highlight: "That's all, thanks for your feedback!",
        after: "",
      };

  const { isRecording, recordings, startRecording, stopRecording } =
    useAudioRecorder(currentText, currentRange);

  const handleRecordingComplete = () => {
    setCurrentTextIndex((prev) => prev + 1);
  };

  const handleStopRecording = () => {
    stopRecording();
    handleRecordingComplete();
  };
  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
        <RecordText before={before} highlight={highlight} after={after} />
        {!isCompleted && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Recording {currentTextIndex + 1} of {recordingPrompts.length}
          </p>
        )}
      </div>

      <div className="flex flex-col items-center gap-4">
        <button
          onClick={isRecording ? handleStopRecording : startRecording}
          disabled={isCompleted}
          className={`px-6 py-3 rounded-full font-medium text-white transition-colors ${
            isCompleted
              ? "bg-gray-400 cursor-not-allowed"
              : isRecording
              ? "bg-red-500 hover:bg-red-600"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {isCompleted
            ? "Recording Complete"
            : isRecording
            ? "Stop Recording"
            : "Start Recording"}
        </button>

        <RecordingsList recordings={recordings} />
      </div>
    </div>
  );
}

export default Recorder;
