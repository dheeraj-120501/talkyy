import type { RecordingPrompt } from "../types/RecordingPrompt";
import type { RecordingPromptResponse } from "../types/RecordingPromptResponse";

interface IRecordingService {
  getAllPrompts(): Promise<RecordingPrompt[]>;
}

const recordingService: IRecordingService = {
  async getAllPrompts(): Promise<RecordingPrompt[]> {
    const recordingPromptsResponse: RecordingPromptResponse[] = [
      {
        id: "1",
        text: "The quick brown fox jumps over the lazy dog.",
        recordSubjects: [
          [0, 6],
          [2, 3],
          [4, 5],
          [6, 7],
        ],
      },
    ];

    const recordingPrompts: RecordingPrompt[] =
      recordingPromptsResponse.flatMap((prompt) => {
        return prompt.recordSubjects.map((recordSubject) => ({
          id: prompt.id,
          text: prompt.text,
          recordSpan: recordSubject,
        }));
      });
    return recordingPrompts;
  },
};

export default recordingService;
