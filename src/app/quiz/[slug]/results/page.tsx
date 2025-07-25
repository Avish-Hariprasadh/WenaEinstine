import { quizCategories } from '@/data/quizzes';
import { notFound } from 'next/navigation';
import ResultsClient from '@/components/results-client';

type QuizResultsPageProps = {
  params: {
    slug: string;
  };
};

export default function QuizResultsPage({ params }: QuizResultsPageProps) {
  const { slug } = params;
  const quiz = quizCategories.find((category) => category.slug === slug);

  if (!quiz) {
    notFound();
  }
  
  const correctAnswersMap = quiz.questions.reduce((acc, q) => {
    acc[q.id] = q.correctAnswer;
    return acc;
  }, {} as Record<string, string>);


  return <ResultsClient quiz={quiz} correctAnswers={correctAnswersMap} />;
}
