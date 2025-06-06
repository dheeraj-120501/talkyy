export interface TranscriberResponse {
  transcription: string;
  answer: string | null;
  answer_audio: AudioResponse | null;
}

export interface AudioResponse {
  filename: string;
  mime_type: string;
  audio_base64: string;
  size: number;
}
