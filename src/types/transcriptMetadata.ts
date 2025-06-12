import type { Language } from "./language";

export interface TranscriptMetadata {
  id: string;
  userId: string;
  timestamp: Date;
  questionFile: string;
  originalQuestion: string;
  transcribedQuestion: string;
  answerFile: string | null;
  answer: string | null;
  language: Language;
}
