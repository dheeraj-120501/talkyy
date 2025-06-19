import { TranscriptList } from "./TranscriptsList";
import { useAudioRecorder } from "../hooks/useAudioRecorder";
import { useTranscriber } from "../hooks/useTranscriber";
import { useIndexedDB } from "../hooks/useIndexedDB";
import type { Language } from "../types/language";
import type { Transcript } from "../types/transcript";
import { base64ToBlob } from "../utils/blobConversion";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useQuery } from "@tanstack/react-query";
import { getQuestions } from "../utils/apiCall";
import type { Question } from "../types/question";
import { importTranscripts } from "../utils/import";
import type { ChangeEvent } from "react";
import { v4 as uuidv4 } from "uuid";
import type { Phrase } from "../types/phrase";
import { PhraseList } from "./PhraseList";

const languageOptions: { value: Language; label: string }[] = [
  { label: "English", value: "en-IN" },
  { label: "Hindi", value: "hi-IN" },
  { label: "Bengali", value: "bn-IN" },
  { label: "Telugu", value: "te-IN" },
  { label: "Tamil", value: "ta-IN" },
  { label: "Marathi", value: "mr-IN" },
  { label: "Gujarati", value: "gu-IN" },
  { label: "Kannada", value: "kn-IN" },
  { label: "Malayalam", value: "ml-IN" },
];

function Recorder({ userToken }: { userToken: string | null }) {
  const [language, setLanguage] = useLocalStorage<Language>(
    "language",
    "en-IN",
  );
  const [callAISearch, setCallAISearch] = useLocalStorage(
    "callAISearch",
    false,
  );
  const [userId] = useLocalStorage<string>("userId", uuidv4());

  const [phrases, setPhrases] = useLocalStorage<Phrase[]>("phrases", []);
  const currentPhrases = phrases.filter(
    (phrase) => phrase.language === language,
  );

  const { data: questions, isFetching: loadingQuestions } = useQuery({
    queryKey: ["questions", language],
    queryFn: async () => {
      return await getQuestions(language);
    },
  });

  const {
    records: transcripts,
    addRecord: addTranscript,
    addRecords: addTranscripts,
    deleteRecord: deleteTranscript,
    deleteAllRecords: deleteAllTranscripts,
  } = useIndexedDB<Transcript>("transcript", 1);

  const pendingQuestions = questions
    ? ((): Question[] => {
        const askedQuestions = transcripts.filter(
          (transcript: Transcript) => transcript.language === language,
        );
        return questions.filter((question: Question) => {
          return (
            askedQuestions.find(
              (transcript: Transcript) =>
                transcript.id.split(":")[0] === question.id,
            ) === undefined
          );
        });
      })()
    : [];
  const currentQuestion = 0;
  const isFinished = pendingQuestions.length === 0;

  const { isTranscribing, transcribe } = useTranscriber(
    (audio, response, language) => {
      const originalQuestion = pendingQuestions[currentQuestion];
      return addTranscript({
        id: `${originalQuestion.id}:${userId}:${language}`,
        userId,
        timestamp: new Date(),
        questionAudio: audio,
        originalQuestion: originalQuestion.question,
        transcribedQuestion: response.transcription,
        language,
        answer: response.text_response,
        answerAudio: response.audio_response
          ? base64ToBlob(response.audio_response)
          : null,
      });
    },
  );

  const { isRecording, startRecording, stopRecording } = useAudioRecorder(
    (audio: Blob) =>
      transcribe(
        audio,
        language,
        currentPhrases,
        callAISearch,
        userToken,
        userId,
      ),
  );

  const uploadTranscripts = async (e: ChangeEvent<HTMLInputElement>) => {
    const importedTranscripts = await importTranscripts(e.target.files![0]);
    console.log(importedTranscripts);
    addTranscripts(importedTranscripts);
  };

  return (
    <div className="max-w-2xl mx-auto mt-5 space-y-8">
      <div className="flex flex-col items-center gap-4">
        <div className="mb-2">
          <label
            htmlFor="import-transcripts"
            className="px-6 py-3 mb-10 rounded-full font-medium text-white bg-green-500 hover:bg-green-600"
          >
            Import
          </label>
          <input
            type="file"
            accept=".zip"
            id="import-transcripts"
            multiple={false}
            onChange={uploadTranscripts}
            hidden={true}
          />
        </div>

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

        <PhraseList
          phrases={currentPhrases}
          setPhrases={setPhrases}
          language={language}
        />

        <div className="w-11/12">
          <div className="text-lg dark:text-gray-100">
            Question (
            {`${(questions ? questions.length : 0) - pendingQuestions.length + 1}/${questions?.length}`}
            )
          </div>
          <div className="max-h-45 overflow-auto bg-gray-200 dark:bg-gray-700 dark:text-gray-200 p-4 rounded-lg">
            {loadingQuestions
              ? "Loading..."
              : isFinished
                ? "No more Questions"
                : pendingQuestions[currentQuestion].question}
          </div>
        </div>

        <div>
          <input
            type="checkbox"
            id="call-ai-search"
            defaultChecked={callAISearch}
            onChange={(e) => setCallAISearch(e.target.checked)}
          />
          <label htmlFor="call-ai-search" className="ml-2 dark:text-gray-100">
            Call AI Search
          </label>
        </div>

        <button
          onClick={isRecording ? stopRecording : startRecording}
          disabled={isTranscribing || loadingQuestions || isFinished}
          className={`px-6 py-3 mb-10 rounded-full font-medium text-white disabled:bg-gray-500 disabled:cursor-not-allowed disabled:dark:bg-gray-700 transition-colors ${
            isRecording
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
