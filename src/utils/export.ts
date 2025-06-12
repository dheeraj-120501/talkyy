import JSZip from "jszip";
import type { Transcript } from "../types/transcript";

export const exportTranscripts = async (transcripts: Transcript[]) => {
  const zip = new JSZip();

  // Add question and answer recordings
  transcripts.forEach((recording: Transcript) => {
    zip.file(`questions/${recording.id}.wav`, recording.questionAudio);
    if (recording.answerAudio)
      zip.file(`answers/${recording.id}.mp3`, recording.answerAudio);
  });

  // Add question and answer metadata
  const transcriptsMetadata = transcripts.map((recording: Transcript) => {
    return {
      id: recording.id,
      userId: recording.userId,
      timestamp: recording.timestamp,
      questionFile: `questions/${recording.id}.wav`,
      originalQuestion: recording.originalQuestion,
      transcribedQuestion: recording.transcribedQuestion,
      answerFile: recording.answerAudio ? `answers/${recording.id}.mp3` : null,
      answer: recording.answer,
      language: recording.language,
    };
  });
  const metadataBlob = new Blob([JSON.stringify(transcriptsMetadata)], {
    type: "text/plain",
  });

  zip.file("metadata.json", metadataBlob);

  // Generate the zip file
  const content = await zip.generateAsync({ type: "blob" });

  // Create a link element to trigger the download
  const link = document.createElement("a");
  link.href = URL.createObjectURL(content);
  link.download = "recordings.zip";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
