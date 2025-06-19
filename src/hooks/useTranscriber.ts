import { useState } from "react";
import type { Language } from "../types/language";
import type { TranscriberResponse } from "../types/transcriberResponse";
import { transcribeAudio } from "../utils/apiCall";
import type { Phrase } from "../types/phrase";

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
    phrases: Phrase[],
    call_ai_search: boolean,
    userToken: string | null,
    userId: string,
  ) => {
    setIsTranscribing(true);

    try {
      const response = await transcribeAudio(
        audio,
        language,
        phrases,
        call_ai_search,
        userToken,
        userId,
      );
      await onTranscribeComplete(audio, response, language);
      setIsTranscribing(false);
    } catch {
      setIsTranscribing(false);
    }
  };

  return { transcribe, isTranscribing };
};
