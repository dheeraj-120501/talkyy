import type { Language } from "./language";

export interface Recording {
  blob: Blob;
  base64Blob: string;
  timestamp: Date;
  id: string;
  language: Language;
  transcription: string;
}
