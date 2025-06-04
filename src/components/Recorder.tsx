import { TranscriptList } from "./TranscriptsList";
import { useAudioRecorder } from "../hooks/useAudioRecorder";
import { useTranscriber } from "../hooks/useTranscriber";
import { useIndexedDB } from "../hooks/useIndexedDB";
import { useState } from "react";
import type { Language } from "../types/language";
import type { Transcript } from "../types/transcript";

const languageOptions: { value: Language; label: string }[] = [
  { value: "en-IN", label: "English" },
  { value: "hi-IN", label: "Hindi" },
];

function Recorder() {
  const [language, setLanguage] = useState<Language>("en-IN");

  const {
    records: transcripts,
    addRecord: addTranscript,
    deleteRecord: deleteTranscript,
    deleteAllRecords: deleteAllTranscripts,
  } = useIndexedDB<Transcript>("transcript");

  const { isTranscribing, transcribe } = useTranscriber(
    (audio, transcript, language) => {
      console.log(audio, transcript, language);
      return addTranscript({
        id: crypto.randomUUID(),
        blob: audio,
        timestamp: new Date(),
        transcript,
        language,
      });
    },
  );

  const { isRecording, startRecording, stopRecording } = useAudioRecorder(
    (audio: Blob) => transcribe(audio, language),
  );

  return (
    <div className="max-w-2xl mx-auto mt-5 space-y-8">
      <div className="flex flex-col items-center gap-4">
        <label className="text-md dark:text-gray-200" htmlFor="language-select">
          Language select
        </label>
        <select
          className="rounded-lg px-6 py-3 mb-7 shadow font-medium dark:text-gray-100 dark:bg-gray-700"
          name="language-select"
          defaultValue={language}
          onChange={(e) => setLanguage(e.target.value as Language)}
        >
          {languageOptions.map(
            ({ value, label }: { value: Language; label: string }, index) => {
              return (
                <option value={value} key={index}>
                  {label}
                </option>
              );
            },
          )}
        </select>

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

        <TranscriptList
          transcripts={transcripts}
          deleteTranscript={deleteTranscript}
          deleteAllTranscripts={deleteAllTranscripts}
        />
      </div>
    </div>
  );
}

export default Recorder;
