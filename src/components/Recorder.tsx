import { useState } from "react";
import { RecordingsList } from "./RecordingsList";
import { useAudioRecorder } from "../hooks/useAudioRecorder";
import type { Recording } from "../types/Recording";
import { useTranscriber } from "../hooks/useTranscriber";

function Recorder() {
  const [recordings, setRecordings] = useState<Recording[]>([]);

  const onTranscribeComplete = (audio: Blob, transcription: string) => {
    setRecordings((prev: Recording[]) => [
      {
        blob: audio,
        timestamp: new Date(),
        id: crypto.randomUUID(),
        transcription,
      },
      ...prev,
    ]);
  };

  const { isTranscribing, tarnscribe } = useTranscriber(onTranscribeComplete);
  const { isRecording, startRecording, stopRecording } =
    useAudioRecorder(tarnscribe);

  return (
    <div className="max-w-2xl mx-auto mt-5 space-y-8">
      <div className="flex flex-col items-center gap-4">
        <button
          onClick={isRecording ? stopRecording : startRecording}
          disabled={isTranscribing}
          className={`px-6 py-3 rounded-full font-medium text-white transition-colors ${
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

        <RecordingsList recordings={recordings} />
      </div>
    </div>
  );
}

export default Recorder;
