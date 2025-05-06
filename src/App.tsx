import { useAudioRecorder } from "./hooks/useAudioRecorder";
import { useDarkMode } from "./hooks/useDarkMode";
import { RecordingsList } from "./components/RecordingsList";

function App() {
  const { isRecording, recordings, startRecording, stopRecording } =
    useAudioRecorder();
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const sampleText = "The quick brown fox jumps over the lazy dog.";

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
            {sampleText}
          </p>
        </div>

        <div className="flex flex-col items-center gap-4">
          <button
            onClick={isRecording ? stopRecording : startRecording}
            className={`px-6 py-3 rounded-full font-medium text-white transition-colors ${
              isRecording
                ? "bg-red-500 hover:bg-red-600"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {isRecording ? "Stop Recording" : "Start Recording"}
          </button>

          <RecordingsList recordings={recordings} />
        </div>
      </div>
    </div>
  );
}

export default App;
