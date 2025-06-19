import type { Language } from "../types/language";
import type { Phrase } from "../types/phrase";
import type { Question } from "../types/question";
import type { TranscriberResponse } from "../types/transcriberResponse";

export const transcribeAudio = async (
  audio: Blob,
  language: Language,
  phrases: Phrase[],
  call_ai_search: boolean,
  userToken: string | null,
  userId: string,
): Promise<TranscriberResponse> => {
  const formdata = new FormData();
  formdata.append("audio_file", audio, "sample.wav");
  formdata.append("language", language);
  phrases.forEach((phrase) =>
    formdata.append(
      "vocabulary",
      JSON.stringify({ value: phrase.value, boost: phrase.boost }),
    ),
  );
  formdata.append("call_ai_search", call_ai_search.toString());

  const headers = new Headers();
  if (userToken) headers.append("user-token", userToken);
  headers.append("user-id", userId);

  const requestOptions = {
    method: "POST",
    body: formdata,
    headers: headers,
  };

  const response = await fetch("/dev/transcribe-audio/", requestOptions);
  return await response.json();
};

export const getQuestions = async (language: Language): Promise<Question[]> => {
  const response = await fetch(`/dev/questions/${language}`, { method: "GET" });

  return await response.json();
};
