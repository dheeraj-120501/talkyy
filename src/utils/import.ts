import JSZip from "jszip";
import type { TranscriptMetadata } from "../types/transcriptMetadata";
import type { Transcript } from "../types/transcript";

export const importTranscripts = async (
  uploadedFile: File,
): Promise<Transcript[]> => {
  const content = await JSZip.loadAsync(uploadedFile);
  const jsonContent = await content.file("metadata.json")?.async("text");

  if (jsonContent === undefined) {
    throw new Error("Invalid File");
  }

  const transcriptsMetadata: TranscriptMetadata[] = JSON.parse(jsonContent);

  return await Promise.all(
    transcriptsMetadata.map(async (metadata): Promise<Transcript> => {
      const questionAudio = await content
        .file(metadata.questionFile)!
        .async("blob");
      const answerAudio = await content
        .file(metadata.questionFile)!
        .async("blob");
      return {
        id: metadata.id,
        userId: metadata.userId,
        timestamp: metadata.timestamp,
        language: metadata.language,
        originalQuestion: metadata.originalQuestion,
        transcribedQuestion: metadata.transcribedQuestion,
        answer: metadata.answer,
        answerAudio,
        questionAudio,
      };
    }),
  );
};
