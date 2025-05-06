import { useAudioRecorder } from "./hooks/useAudioRecorder";
import { RecordingsList } from "./components/RecordingsList";

function App() {
  const { isRecording, recordings, startRecording, stopRecording } =
    useAudioRecorder();
  const sampleText = "The quick brown fox jumps over the lazy dog.";

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <p className="text-lg text-gray-700">{sampleText}</p>
        </div>

        <div className="flex flex-col items-center gap-4">
          <button
            onClick={isRecording ? stopRecording : startRecording}
            className={`px-6 py-3 rounded-full font-medium text-white transition-colors hover:cursor-pointer ${
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
