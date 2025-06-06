import type { AudioResponse } from "../types/transcriberResponse";

export const base64ToBlob = (audio_response: AudioResponse): Blob => {
  const binaryString = atob(audio_response.audio_base64);
  const byteArray = new Uint8Array(binaryString.length);

  for (let i = 0; i < binaryString.length; i++) {
    byteArray[i] = binaryString.charCodeAt(i);
  }

  return new Blob([byteArray], { type: audio_response.mime_type });
};
