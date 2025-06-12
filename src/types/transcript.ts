import type { Language } from "./language";

export interface Transcript {
  id: string;
  userId: string;
  timestamp: Date;
  language: Language;
  questionAudio: Blob;
  originalQuestion: string;
  transcribedQuestion: string;
  answer: string | null;
  answerAudio: Blob | null;
}
