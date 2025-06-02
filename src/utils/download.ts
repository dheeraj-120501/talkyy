import JSZip from "jszip";
import type { Recording } from "../types/recording";


export const downloadRecordings = async (recordings: Recording[]) => {
  const zip = new JSZip();

  // Add recordings
  recordings.forEach((recording: Recording) => {
    zip.file(`${recording.id}.wav`, recording.blob);
  });

  // Add transcriptions
  const transcriptions = recordings.map((recording: Recording) => {
    return { id: recording.id, transcription: recording.transcription };
  });
  const transcriptionsBlob = new Blob([JSON.stringify(transcriptions)], {
    type: "text/plain",
  });

  zip.file("transcriptions.json", transcriptionsBlob);

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
