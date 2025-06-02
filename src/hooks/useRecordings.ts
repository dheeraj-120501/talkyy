import { useEffect, useState } from "react";
import type { Recording } from "../types/Recording";
import { base64ToBlob, blobToBase64 } from "../utils/blobCoversion";

export const useRecordings = () => {
  const [recordings, setRecordings] = useState<Recording[]>(() => {
    const savedRecordings = localStorage.getItem("recordings");
    return savedRecordings
      ? (JSON.parse(savedRecordings) as Recording[]).map(
          (recording: Recording): Recording => {
            return { ...recording, blob: base64ToBlob(recording.base64Blob) };
          },
        )
      : [];
  });

  const addRecording = async (audio: Blob, transcription: string) => {
    const res = await blobToBase64(audio);
    setRecordings((prev: Recording[]) => [
      {
        blob: audio,
        base64Blob: res,
        timestamp: new Date(),
        id: crypto.randomUUID(),
        transcription,
      },
      ...prev,
    ]);
  };

  useEffect(() => {
    localStorage.setItem("recordings", JSON.stringify(recordings));
  }, [recordings]);

  return { recordings, addRecording };
};
