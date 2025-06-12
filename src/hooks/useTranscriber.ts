import { useState } from "react";
import type { Language } from "../types/language";
import type { TranscriberResponse } from "../types/transcriberResponse";
import { transcribeAudio } from "../utils/apiCall";

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
      const response = await transcribeAudio(
        audio,
        language,
        call_multi_agent,
        userToken,
      );
      await onTranscribeComplete(audio, response, language);
      setIsTranscribing(false);
    } catch {
      setIsTranscribing(false);
    }
  };

  return { transcribe, isTranscribing };
};
