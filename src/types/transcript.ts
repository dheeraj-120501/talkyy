import type { Language } from "./language";

export interface Transcript {
  id: string;
  timestamp: Date;
  language: Language;
  questionAudio: Blob;
  transcribedQuestion: string;
  answer: string | null;
  answerAudio: Blob | null;
}
