export interface LessonContent {
  courseSlug: string;
  moduleIndex: number;
  title: string;
  content: string;
  keyTakeaways: string[];
  estimatedMinutes: number;
}

export const lessonContent: LessonContent[] = [
