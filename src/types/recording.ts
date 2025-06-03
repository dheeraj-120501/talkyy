import type { Language } from "./language";

export interface Recording {
  blob: Blob;
  timestamp: Date;
  id: string;
  language: Language;
  transcription: string;
}
