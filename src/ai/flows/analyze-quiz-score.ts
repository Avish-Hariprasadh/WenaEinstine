'use server';

/**
 * @fileOverview Analyzes a user's quiz score and provides personalized tips for improvement.
 *
 * - analyzeQuizScore - A function that analyzes the quiz score and returns improvement tips.
 * - AnalyzeQuizScoreInput - The input type for the analyzeQuizScore function.
 * - AnalyzeQuizScoreOutput - The return type for the analyzeQuizScore function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeQuizScoreInputSchema = z.object({
  quizCategory: z.string().describe('The category of the quiz.'),
  score: z.number().describe('The user\'s score on the quiz (0-100).'),
  userAnswers: z.record(z.string(), z.string()).describe('A map of question IDs to user-provided answers.'),
  correctAnswers: z.record(z.string(), z.string()).describe('A map of question IDs to correct answers.'),
});
export type AnalyzeQuizScoreInput = z.infer<typeof AnalyzeQuizScoreInputSchema>;

const AnalyzeQuizScoreOutputSchema = z.object({
  tips: z.array(z.string()).describe('Personalized tips for improving the quiz score.'),
});
export type AnalyzeQuizScoreOutput = z.infer<typeof AnalyzeQuizScoreOutputSchema>;

export async function analyzeQuizScore(input: AnalyzeQuizScoreInput): Promise<AnalyzeQuizScoreOutput> {
  return analyzeQuizScoreFlow(input);
}

const analyzeQuizScorePrompt = ai.definePrompt({
  name: 'analyzeQuizScorePrompt',
  input: {schema: z.object({
    quizCategory: z.string(),
    score: z.number(),
    userAnswers: z.string(),
    correctAnswers: z.string(),
  })},
  output: {schema: AnalyzeQuizScoreOutputSchema},
  prompt: `You are an AI quiz score analyzer. You will receive the category of the quiz, the user's score, the user's answers, and the correct answers.

  Based on this information, provide personalized tips to the user on how to improve their score in the future. Focus on specific areas where the user struggled, based on incorrect answers.

  Quiz Category: {{{quizCategory}}}
  User Score: {{{score}}}
  User Answers: {{{userAnswers}}}
  Correct Answers: {{{correctAnswers}}}

  Tips:`,
});

const analyzeQuizScoreFlow = ai.defineFlow(
  {
    name: 'analyzeQuizScoreFlow',
    inputSchema: AnalyzeQuizScoreInputSchema,
    outputSchema: AnalyzeQuizScoreOutputSchema,
  },
  async input => {
    const {output} = await analyzeQuizScorePrompt({
      quizCategory: input.quizCategory,
      score: input.score,
      userAnswers: JSON.stringify(input.userAnswers),
      correctAnswers: JSON.stringify(input.correctAnswers),
    });
    return output!;
  }
);
