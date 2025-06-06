import { useState } from "react";
import type { Language } from "../types/language";
import type { TranscriberResponse } from "../types/transcriberResponse";

const callApi = async (
  audio: Blob,
  language: Language,
  call_multi_agent: boolean,
  userToken: string | null,
): Promise<TranscriberResponse> => {
  const formdata = new FormData();
  formdata.append("audio_file", audio, "sample.wav");
  formdata.append("language", language);
  formdata.append("vocabulary", "[]");
  formdata.append("call_multi_agent", call_multi_agent.toString());

  const headers = new Headers();
  if (userToken) headers.append("user-token", userToken);

  const requestOptions = {
    method: "POST",
    body: formdata,
    headers: headers,
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
    response: TranscriberResponse,
    language: Language,
  ) => Promise<void>,
) => {
  const [isTranscribing, setIsTranscribing] = useState(false);

  const transcribe = async (
    audio: Blob,
    language: Language,
    call_multi_agent: boolean,
    userToken: string | null,
  ) => {
    setIsTranscribing(true);

    try {
      const response = await callApi(
        audio,
        language,
        call_multi_agent,
        userToken,
      );
      console.log(response);
      await onTranscribeComplete(audio, response, language);
      setIsTranscribing(false);
    } catch {
      setIsTranscribing(false);
    }
  };

  return { transcribe, isTranscribing };
};
