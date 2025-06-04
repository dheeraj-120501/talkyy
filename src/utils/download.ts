import JSZip from "jszip";
import type { Transcript } from "../types/transcript";

export const downloadTranscripts = async (transcripts: Transcript[]) => {
  const zip = new JSZip();

  // Add recordings
  transcripts.forEach((recording: Transcript) => {
    zip.file(`${recording.id}.wav`, recording.blob);
  });

  // Add transcripts
  const transcriptsMetadata = transcripts.map((recording: Transcript) => {
    return {
      id: recording.id,
      file: `${recording.id}.wav`,
      transcript: recording.transcript,
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
  link.download = "transcripts.zip";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
