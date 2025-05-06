import { useState } from "react";
import { useAudioRecorder } from "./hooks/useAudioRecorder";
import { useDarkMode } from "./hooks/useDarkMode";
import { RecordingsList } from "./components/RecordingsList";
import type { TextItem } from "./types/TextItem";

function App() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  const texts: TextItem[] = [
    { id: "1", text: "The quick brown fox jumps over the lazy dog." },
    { id: "2", text: "Pack my box with five dozen liquor jugs." },
    { id: "3", text: "How vexingly quick daft zebras jump." },
    { id: "4", text: "Two driven jocks help fax my big quiz." },
  ];

  const isCompleted = currentTextIndex >= texts.length;
  const currentText = isCompleted
    ? "That's all, thanks for your feedback!"
    : texts[currentTextIndex].text;

  const { isRecording, recordings, startRecording, stopRecording } =
    useAudioRecorder(currentText);

  const handleRecordingComplete = () => {
    setCurrentTextIndex((prev) => prev + 1);
  };

  const handleStopRecording = () => {
    stopRecording();
    handleRecordingComplete();
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
      <div className="fixed top-4 right-4">
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
        >
          {isDarkMode ? "🌞" : "🌙"}
        </button>
      </div>

      <div className="max-w-2xl mx-auto space-y-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <p className="text-lg text-gray-700 dark:text-gray-200">
            {currentText}
          </p>
          {!isCompleted && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Recording {currentTextIndex + 1} of {texts.length}
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
    </div>
  );
}

export default App;
