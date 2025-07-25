'use client';

import type { QuizCategory } from '@/types';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ArrowLeft, ArrowRight } from 'lucide-react';

type QuizClientProps = {
  quiz: QuizCategory;
};

export default function QuizClient({ quiz }: QuizClientProps) {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(((currentQuestionIndex + 1) / quiz.questions.length) * 100);
  }, [currentQuestionIndex, quiz.questions.length]);

  const handleAnswerSelect = (questionId: string, answer: string) => {
    setUserAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    localStorage.setItem(`quizAnswers-${quiz.slug}`, JSON.stringify(userAnswers));
    router.push(`/quiz/${quiz.slug}/results`);
  };

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;

  return (
    <div className="container mx-auto max-w-3xl py-8 md:py-12">
      <Card className="shadow-2xl border-2 border-primary/20">
        <CardHeader>
          <Progress value={progress} className="w-full mb-4 h-3 bg-secondary" />
          <CardTitle className="font-headline text-2xl md:text-3xl text-center">
            {quiz.title}
          </CardTitle>
          <CardDescription className="text-center text-lg">
            Question {currentQuestionIndex + 1} of {quiz.questions.length}
          </CardDescription>
        </CardHeader>
        <CardContent className="px-6 py-8 md:px-8 md:py-10">
          <div key={currentQuestion.id} className="animate-in fade-in duration-500">
            <h2 className="text-xl md:text-2xl font-semibold mb-6 text-center">
              {currentQuestion.questionText}
            </h2>
            <RadioGroup
              value={userAnswers[currentQuestion.id] || ''}
              onValueChange={(value) => handleAnswerSelect(currentQuestion.id, value)}
              className="space-y-4"
            >
              {currentQuestion.options.map((option, index) => (
                <Label
                  key={index}
                  htmlFor={`${currentQuestion.id}-${index}`}
                  className={`flex items-center space-x-4 p-4 rounded-lg border-2 transition-all cursor-pointer hover:border-primary ${
                    userAnswers[currentQuestion.id] === option.text
                      ? 'border-primary bg-primary/10'
                      : 'border-border'
                  }`}
                >
                  <RadioGroupItem value={option.text} id={`${currentQuestion.id}-${index}`} />
                  <span className="text-base md:text-lg">{option.text}</span>
                </Label>
              ))}
            </RadioGroup>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between p-6 bg-muted/50 rounded-b-lg">
          <Button variant="outline" onClick={handlePrevious} disabled={currentQuestionIndex === 0}>
            <ArrowLeft className="mr-2" />
            Previous
          </Button>
          {isLastQuestion ? (
            <Button size="lg" onClick={handleSubmit} disabled={!userAnswers[currentQuestion.id]}>
              View Results
            </Button>
          ) : (
            <Button variant="default" onClick={handleNext} disabled={!userAnswers[currentQuestion.id]}>
              Next
              <ArrowRight className="ml-2" />
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
