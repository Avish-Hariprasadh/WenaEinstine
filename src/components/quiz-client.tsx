
'use client';

import type { QuizCategory } from '@/types';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ArrowLeft, ArrowRight, TimerIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

type QuizClientProps = {
  quiz: QuizCategory;
};

export default function QuizClient({ quiz }: QuizClientProps) {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [progress, setProgress] = useState(0);
  const [timer, setTimer] = useState(10);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;

  const resetTimer = () => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }
    setTimer(10);
  };

  const handleNext = () => {
    resetTimer();
    if (!isLastQuestion) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleSubmit();
    }
  };

  useEffect(() => {
    setProgress(((currentQuestionIndex + 1) / quiz.questions.length) * 100);
  }, [currentQuestionIndex, quiz.questions.length]);

  useEffect(() => {
    if (userAnswers[currentQuestion.id]) {
        if (timerIntervalRef.current) {
            clearInterval(timerIntervalRef.current);
        }
        return;
    }

    resetTimer();

    timerIntervalRef.current = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 1) {
          handleNext();
          return 10;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuestionIndex]);
  

  const handleAnswerSelect = (questionId: string, answer: string) => {
    setUserAnswers((prev) => ({ ...prev, [questionId]: answer }));
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }
    // Automatically move to next question after a short delay
    setTimeout(() => {
        handleNext();
    }, 500);
  };

  const handlePrevious = () => {
    resetTimer();
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
    }
    localStorage.setItem(`quizAnswers-${quiz.slug}`, JSON.stringify(userAnswers));
    router.push(`/quiz/${quiz.slug}/results`);
  };

  const timerColor = timer <= 3 ? 'text-destructive' : 'text-muted-foreground';
  const timerProgress = (timer / 10) * 100;
  
  const timerBarColor = cn({
    "bg-green-500": timer > 6,
    "bg-yellow-500": timer > 3 && timer <= 6,
    "bg-red-500": timer <= 3,
  });

  return (
    <div className="container mx-auto max-w-3xl py-8 md:py-12">
      <Card className="shadow-2xl border-2 border-primary/20">
        <CardHeader>
            <div className='mb-4 space-y-3'>
                <div className='flex justify-between items-center text-sm text-muted-foreground'>
                    <span>Overall Progress</span>
                    <span>Question {currentQuestionIndex + 1} of {quiz.questions.length}</span>
                </div>
                <Progress value={progress} className="w-full h-2" />
            </div>

            <div className='mb-4 space-y-2'>
                <div className="flex justify-between items-center">
                    <div className={`flex items-center font-bold ${timerColor}`}>
                        <TimerIcon className="mr-2 h-5 w-5" />
                        <span className='text-lg'>Time remaining: {timer}s</span>
                    </div>
                </div>
                <Progress value={timerProgress} className="h-3 [&>div]:transition-all [&>div]:duration-1000 [&>div]:ease-linear" indicatorClassName={timerBarColor} />
            </div>

          <CardTitle className="font-headline text-2xl md:text-3xl text-center pt-4 border-t">
            {quiz.title}
          </CardTitle>

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
              disabled={!!userAnswers[currentQuestion.id]}
            >
              {currentQuestion.options.map((option, index) => (
                <Label
                  key={index}
                  htmlFor={`${currentQuestion.id}-${index}`}
                  className={`flex items-center space-x-4 p-4 rounded-lg border-2 transition-all ${!!userAnswers[currentQuestion.id] ? 'cursor-not-allowed' : 'cursor-pointer hover:border-primary'} ${
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
            <Button size="lg" onClick={handleSubmit}>
              View Results
            </Button>
          ) : (
            <Button variant="default" onClick={handleNext}>
              Next
              <ArrowRight className="ml-2" />
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
