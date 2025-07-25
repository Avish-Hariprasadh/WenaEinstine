export type AnswerOption = {
  text: string;
};

export type Question = {
  id: string;
  questionText: string;
  options: AnswerOption[];
  correctAnswer: string;
  explanation: string;
};

export type QuizCategory = {
  title: string;
  slug: string;
  description: string;
  imageHint: string;
  questions: Question[];
};
