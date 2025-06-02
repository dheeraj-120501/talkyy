import { RecordingsList } from "./RecordingsList";
import { useAudioRecorder } from "../hooks/useAudioRecorder";
import { useTranscriber } from "../hooks/useTranscriber";
import { useRecordings } from "../hooks/useRecordings";

function Recorder() {
  const { recordings, addRecording, deleteRecording, deleteAllRecordings } =
    useRecordings();
  const { isTranscribing, transcribe } = useTranscriber(addRecording);
  const { isRecording, startRecording, stopRecording } =
    useAudioRecorder(transcribe);

  return (
    <div className="max-w-2xl mx-auto mt-5 space-y-8">
      <div className="flex flex-col items-center gap-4">
        <button
          onClick={isRecording ? stopRecording : startRecording}
          disabled={isTranscribing}
          className={`px-6 py-3 mb-10 rounded-full font-medium text-white transition-colors ${
            isTranscribing
              ? "bg-gray-400 cursor-not-allowed"
              : isRecording
                ? "bg-red-500 hover:bg-red-600"
                : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {isTranscribing
            ? "Transcribing"
            : isRecording
              ? "Stop Recording"
              : "Start Recording"}
        </button>

        <RecordingsList
          recordings={recordings}
          deleteRecording={deleteRecording}
          deleteAllRecordings={deleteAllRecordings}
        />
      </div>
    </div>
  );
}

export default Recorder;
