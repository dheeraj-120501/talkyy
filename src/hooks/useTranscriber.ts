import { useState } from "react";
import type { Language } from "../types/language";

const callApi = async (audio: Blob, language: Language) => {
  const formdata = new FormData();
  formdata.append("audio_file", audio, "sample.wav");
  formdata.append("language", language);
  formdata.append("vocabulary", "[]");

  const requestOptions = {
    method: "POST",
    body: formdata,
  };

  const response = await fetch(
    "http://127.0.0.1:8000/dev/transcribe-audio/",
    requestOptions,
  );
  return await response.json();
};

export const useTranscriber = (
  onTranscribeComplete: (
    audio: Blob,
    transcription: string,
    language: Language,
  ) => Promise<void>,
) => {
  const [isTranscribing, setIsTranscribing] = useState(false);

  const transcribe = async (audio: Blob, language: Language) => {
    setIsTranscribing(true);

    try {
      const transcription = await callApi(audio, language);
      await onTranscribeComplete(audio, transcription.transcription, language);
      setIsTranscribing(false);
    } catch {
      setIsTranscribing(false);
    }
  };

  return { transcribe, isTranscribing };
};
