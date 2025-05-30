import { useState, useRef } from "react";
import {
  MediaRecorder,
  type IMediaRecorder,
  register,
} from "extendable-media-recorder";
import { connect } from "extendable-media-recorder-wav-encoder";

export const useAudioRecorder = (
  onRecordingComplete: (recording: Blob) => void,
) => {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<IMediaRecorder | null>(null);
  const wavMessagePortRef = useRef<MessagePort | null>(null);

  const startRecording = async () => {
    try {
      if (wavMessagePortRef.current === null) {
        wavMessagePortRef.current = await connect();
        await register(wavMessagePortRef.current);
      }
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream, {
        mimeType: "audio/wav",
      });

      const chunks: BlobPart[] = [];
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      recorder.onstop = () => {
        stream.getTracks().forEach((track) => track.stop());

        const blob = new Blob(chunks, { type: recorder.mimeType });
        onRecordingComplete(blob);
        mediaRecorderRef.current = null;
      };

      mediaRecorderRef.current = recorder;
      recorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      setIsRecording(false);
      mediaRecorderRef.current = null;
    }
  };

  const stopRecording = () => {
    const recorder = mediaRecorderRef.current;
    if (recorder && recorder.state === "recording") {
      recorder.stop();
      setIsRecording(false);
    }
  };

  return {
    isRecording,
    startRecording,
    stopRecording,
  };
};
