import type { Language } from "./language";

export interface Phrase {
  value: string;
  language: Language;
  weight: number;
}
