export interface Recording {
  blob: Blob;
  timestamp: Date;
  id: string;
  text: string;
  wordRange: [number, number];
}
