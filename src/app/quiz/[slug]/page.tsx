import { quizCategories } from '@/data/quizzes';
import { notFound } from 'next/navigation';
import QuizClient from '@/components/quiz-client';

type QuizPageProps = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  return quizCategories.map((category) => ({
    slug: category.slug,
  }));
}

export default function QuizPage({ params }: QuizPageProps) {
  const { slug } = params;
  const quiz = quizCategories.find((category) => category.slug === slug);

  if (!quiz) {
    notFound();
  }

  return <QuizClient quiz={quiz} />;
}
