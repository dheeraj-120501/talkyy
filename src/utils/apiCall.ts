import type { Language } from "../types/language";
import type { Question } from "../types/question";
import type { TranscriberResponse } from "../types/transcriberResponse";

export const transcribeAudio = async (
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

export const getQuestions = async (language: Language): Promise<Question[]> => {
  const response = await fetch(
    `http://127.0.0.1:8000/dev/questions/${language}`,
    { method: "GET" },
  );

  return await response.json();
};
