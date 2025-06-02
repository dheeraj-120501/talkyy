import { useState } from "react";

const callApi = async (audio: Blob) => {
  const formdata = new FormData();
  formdata.append("file", audio, "sample.wav");
  formdata.append("language_encodings", "en-US");
  formdata.append("language_encodings", "es-ES");

  const requestOptions = {
    method: "POST",
    body: formdata,
  };

  const response = await fetch(
    "http://127.0.0.1:8000/upload_audio2/",
    requestOptions,
  );
  return await response.json();
};

export const useTranscriber = (
  onTranscribeComplete: (audio: Blob, transcription: string) => Promise<void>,
) => {
  const [isTranscribing, setIsTranscribing] = useState(false);

  const transcribe = async (audio: Blob) => {
    setIsTranscribing(true);

    try {
      const transcription = await callApi(audio);
      await onTranscribeComplete(audio, transcription.audio_data);
      setIsTranscribing(false);
    } catch {
      setIsTranscribing(false);
    }
  };

  return { transcribe, isTranscribing };
};
