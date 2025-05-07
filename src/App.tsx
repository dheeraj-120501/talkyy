import { useEffect, useState } from "react";
import { useDarkMode } from "./hooks/useDarkMode";
import type { RecordingPrompt } from "./types/RecordingPrompt";
import recordingService from "./services/RecordingService";
import Recorder from "./components/Recorder";

function App() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [recordingPrompts, setRecordingPrompts] = useState<RecordingPrompt[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    // Handle error state as well
    recordingService.getAllPrompts().then((prompts) => {
      setRecordingPrompts(prompts);
      setIsLoading(false);
    });
  }, []);

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
      {isLoading ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          Loading...
        </p>
      ) : (
        <Recorder recordingPrompts={recordingPrompts} />
      )}
    </div>
  );
}

export default App;
