export interface TranscriberResponse {
  transcription: string;
  text_response: string | null;
  audio_response: AudioResponse | null;
}

export interface AudioResponse {
  filename: string;
  mime_type: string;
  audio_base64: string;
  size: number;
}
