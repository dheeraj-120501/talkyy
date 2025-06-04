import type { Language } from "./language";

export interface Transcript {
  blob: Blob;
  timestamp: Date;
  id: string;
  language: Language;
  transcript: string;
}
