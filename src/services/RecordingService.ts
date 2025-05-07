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
      {
        id: "2",
        text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        recordSubjects: [
          [0, 16],
          [5, 13],
          [4, 15],
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
