import type { Language } from "./language";

export interface Transcript {
  questionAudio: Blob;
  timestamp: Date;
  id: string;
  language: Language;
  question: string;
  answer: string | null;
  answerAudio: Blob | null;
}
