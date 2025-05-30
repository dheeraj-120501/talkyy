import { useDarkMode } from "./hooks/useDarkMode";
import Recorder from "./components/Recorder";

function App() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

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
      <Recorder />
    </div>
  );
}

export default App;
