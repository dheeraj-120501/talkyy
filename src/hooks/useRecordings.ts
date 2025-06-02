import { useEffect, useState } from "react";
import type { Recording } from "../types/recording";

import { base64ToBlob, blobToBase64 } from "../utils/blobConversion";

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

  const deleteRecording = (id: string) => {
    setRecordings((current: Recording[]) => {
      return current.filter((recording: Recording) => recording.id !== id);
    });
  };

  const deleteAllRecordings = () => {
    setRecordings([]);
  };

  useEffect(() => {
    localStorage.setItem("recordings", JSON.stringify(recordings));
  }, [recordings]);

  return { recordings, addRecording, deleteRecording, deleteAllRecordings };
};
