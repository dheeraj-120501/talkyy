import Recorder from "./components/Recorder";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useEffect } from "react";

function App() {
  const [isDarkMode, setDarkMode] = useLocalStorage<boolean>(
    "darkMode",
    window.matchMedia("(prefers-color-scheme: dark)").matches,
  );
  const toggleDarkMode = () => setDarkMode((prev: boolean) => !prev);
  const [userToken, setUserToken] = useLocalStorage<string | null>(
    "userToken",
    null,
  );

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
      <div className="flex gap-2 items-center fixed top-4 right-4">
        <div>
          <label htmlFor="user-token" className="dark:text-gray-100">
            User Token
          </label>
          <input
            id="user-token"
            defaultValue={userToken ? userToken : ""}
            className="px-2 py-1 ml-2 dark:text-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 bg-gray-200 hover:bg-gray-300 rounded-md"
            onChange={(e) => setUserToken(e.target.value)}
            type={"text"}
          />
        </div>

        <button
          onClick={toggleDarkMode}
          className="px-2 py-1 ml-2 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
        >
          {isDarkMode ? "🌞" : "🌙"}
        </button>
      </div>
      <Recorder userToken={userToken} />
    </div>
  );
}

export default App;
