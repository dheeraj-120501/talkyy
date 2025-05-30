import { useState } from "react";
import { RecordingsList } from "./RecordingsList";
import { useAudioRecorder } from "../hooks/useAudioRecorder";
import type { Recording } from "../types/Recording";

function Recorder() {
  const [recordings, setRecordings] = useState<Recording[]>([]);

  const onRecordingComplete = (recording: Blob) => {
    setRecordings((prev) => [
      {
        blob: recording,
        timestamp: new Date(),
        id: crypto.randomUUID(),
      },
      ...prev,
    ]);
  };

  const { isRecording, startRecording, stopRecording } =
    useAudioRecorder(onRecordingComplete);

  return (
    <div className="max-w-2xl mx-auto mt-5 space-y-8">
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
  );
}

export default Recorder;
