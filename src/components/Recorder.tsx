import { TranscriptList } from "./TranscriptsList";
import { useAudioRecorder } from "../hooks/useAudioRecorder";
import { useTranscriber } from "../hooks/useTranscriber";
import { useIndexedDB } from "../hooks/useIndexedDB";
import type { Language } from "../types/language";
import type { Transcript } from "../types/transcript";
import { base64ToBlob } from "../utils/blobConversion";
import { useLocalStorage } from "../hooks/useLocalStorage";

const languageOptions: { value: Language; label: string }[] = [
  { label: "English", value: "en-IN" },
  { label: "Hindi", value: "hi-IN" },
  { label: "Bengali", value: "bn-IN" },
  { label: "Telugu", value: "te-IN" },
  { label: "Tamil", value: "ta-IN" },
  { label: "Marathi", value: "mr-IN" },
  { label: "Gujrati", value: "gu-IN" },
  { label: "Kannad", value: "kn-IN" },
  { label: "Malyalam", value: "ml-IN" },
];

function Recorder({ userToken }: { userToken: string | null }) {
  const [language, setLanguage] = useLocalStorage<Language>(
    "language",
    "en-IN",
  );
  const [callMultiAgent, setCallMultiAgent] = useLocalStorage(
    "callMultiAgent",
    false,
  );

  const {
    records: transcripts,
    addRecord: addTranscript,
    deleteRecord: deleteTranscript,
    deleteAllRecords: deleteAllTranscripts,
  } = useIndexedDB<Transcript>("transcript", 1);

  const { isTranscribing, transcribe } = useTranscriber(
    (audio, response, language) => {
      return addTranscript({
        id: crypto.randomUUID(),
        questionAudio: audio,
        timestamp: new Date(),
        transcribedQuestion: response.transcription,
        language,
        answer: response.answer,
        answerAudio: response.answer_audio
          ? base64ToBlob(response.answer_audio)
          : null,
      });
    },
  );

  const { isRecording, startRecording, stopRecording } = useAudioRecorder(
    (audio: Blob) => transcribe(audio, language, callMultiAgent, userToken),
  );

  return (
    <div className="max-w-2xl mx-auto mt-5 space-y-8">
      <div className="flex flex-col items-center gap-4">
        <div>
          <label
            className="text-md dark:text-gray-200"
            htmlFor="language-select"
          >
            Language select
          </label>
          <select
            className="rounded-lg px-6 py-3 ml-2 shadow font-medium dark:text-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
            id="language-select"
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
        </div>

        <div>
          <input
            type="checkbox"
            id="call-multi-agent"
            defaultChecked={callMultiAgent}
            onChange={(e) => setCallMultiAgent(e.target.checked)}
          />
          <label htmlFor="call-multi-agent" className="ml-2 dark:text-gray-100">
            Call MultiAgent
          </label>
        </div>

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
