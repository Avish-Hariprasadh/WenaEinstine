'use client';

import type { QuizCategory, AnalyzeQuizScoreInput, AnalyzeQuizScoreOutput } from '@/types';
import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { analyzeQuizScore } from '@/ai/flows/analyze-quiz-score';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { CheckCircle2, Home, Lightbulb, RefreshCw, Sparkles, XCircle } from 'lucide-react';

type ResultsClientProps = {
  quiz: QuizCategory;
  correctAnswers: Record<string, string>;
};

export default function ResultsClient({ quiz, correctAnswers }: ResultsClientProps) {
  const router = useRouter();
  const [userAnswers, setUserAnswers] = useState<Record<string, string> | null>(null);
  const [score, setScore] = useState(0);
  const [aiTips, setAiTips] = useState<AnalyzeQuizScoreOutput | null>(null);
  const [isLoadingAiTips, setIsLoadingAiTips] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedAnswers = localStorage.getItem(`quizAnswers-${quiz.slug}`);
    if (storedAnswers) {
      const parsedAnswers = JSON.parse(storedAnswers);
      setUserAnswers(parsedAnswers);
      // Optional: Clean up localStorage after reading
      // localStorage.removeItem(`quizAnswers-${quiz.slug}`);
    } else {
      setError("We couldn't find your answers. Please try the quiz again.");
    }
  }, [quiz.slug]);

  const calculatedScore = useMemo(() => {
    if (!userAnswers) return 0;
    let correctCount = 0;
    quiz.questions.forEach((q) => {
      if (userAnswers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });
    return Math.round((correctCount / quiz.questions.length) * 100);
  }, [userAnswers, quiz.questions]);
  
  // Animated score counter
  useEffect(() => {
    let animationFrameId: number;
    let startTimestamp: number | null = null;
    const duration = 1000;

    const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        setScore(Math.floor(progress * calculatedScore));
        if (progress < 1) {
            animationFrameId = requestAnimationFrame(step);
        }
    };

    if (calculatedScore > 0) {
        animationFrameId = requestAnimationFrame(step);
    }
    
    return () => cancelAnimationFrame(animationFrameId);
  }, [calculatedScore]);


  useEffect(() => {
    if (userAnswers) {
      const fetchAiTips = async () => {
        setIsLoadingAiTips(true);
        try {
          const input: AnalyzeQuizScoreInput = {
            quizCategory: quiz.title,
            score: calculatedScore,
            userAnswers: userAnswers,
            correctAnswers: correctAnswers,
          };
          const result = await analyzeQuizScore(input);
          setAiTips(result);
        } catch (e) {
          console.error("Failed to get AI tips:", e);
          setError("Couldn't load AI tips. Please try again later.");
        } finally {
          setIsLoadingAiTips(false);
        }
      };
      fetchAiTips();
    }
  }, [userAnswers, quiz.title, calculatedScore, correctAnswers]);

  if (error) {
    return (
      <div className="container mx-auto max-w-3xl py-12 text-center">
        <Alert variant="destructive">
          <AlertTitle>Oops! Something went wrong.</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <Button onClick={() => router.push(`/quiz/${quiz.slug}`)} className="mt-6">
          <RefreshCw className="mr-2 h-4 w-4" /> Try Quiz Again
        </Button>
      </div>
    );
  }

  if (!userAnswers) {
    return (
      <div className="container mx-auto max-w-3xl py-12">
        <div className="space-y-4">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-48 w-full" />
        </div>
      </div>
    );
  }

  const scoreColor = score >= 75 ? 'text-green-600' : score >= 50 ? 'text-yellow-600' : 'text-red-600';

  return (
    <div className="container mx-auto max-w-4xl py-8 md:py-12">
      <Card className="shadow-lg">
        <CardHeader className="text-center bg-muted/30 p-8 rounded-t-lg">
          <CardDescription className="text-lg">Your Result for</CardDescription>
          <CardTitle className="font-headline text-3xl md:text-4xl">{quiz.title}</CardTitle>
          <div className="my-6">
            <div className={`text-7xl md:text-8xl font-bold font-headline ${scoreColor}`}>{score}%</div>
            <p className="text-muted-foreground mt-2">You answered {Math.round(calculatedScore/100 * quiz.questions.length)} out of {quiz.questions.length} questions correctly.</p>
          </div>
          <div className="flex justify-center gap-4">
            <Button onClick={() => router.push(`/quiz/${quiz.slug}`)}>
              <RefreshCw className="mr-2 h-4 w-4" /> Retake Quiz
            </Button>
            <Button variant="outline" onClick={() => router.push('/')}>
              <Home className="mr-2 h-4 w-4" /> New Category
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          <div className="space-y-4">
             <h3 className="font-headline text-2xl font-semibold flex items-center gap-2">
                <Sparkles className="text-primary" />
                AI-Powered Feedback
              </h3>
            {isLoadingAiTips ? (
              <div className="space-y-3">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-4/5" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-3/4" />
              </div>
            ) : (
              aiTips && (
                <Alert className="bg-primary/5 border-primary/20">
                  <Lightbulb className="h-5 w-5 text-primary" />
                  <AlertTitle className="font-headline text-lg text-primary">Your Personalised Tips</AlertTitle>
                  <AlertDescription>
                    <ul className="list-disc pl-5 space-y-2 mt-2">
                      {aiTips.tips.map((tip, i) => <li key={i}>{tip}</li>)}
                    </ul>
                  </AlertDescription>
                </Alert>
              )
            )}
          </div>
          
          <div className="space-y-4">
            <h3 className="font-headline text-2xl font-semibold">Review Your Answers</h3>
            <Accordion type="single" collapsible className="w-full">
              {quiz.questions.map((q, index) => {
                const isCorrect = userAnswers[q.id] === q.correctAnswer;
                return (
                  <AccordionItem value={`item-${index}`} key={q.id}>
                    <AccordionTrigger className={`flex items-center gap-3 ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                      {isCorrect ? <CheckCircle2 /> : <XCircle />}
                      <span className="text-left flex-1">{q.questionText}</span>
                    </AccordionTrigger>
                    <AccordionContent className="p-4 bg-muted/50 rounded-md">
                      <p><strong>Your answer:</strong> {userAnswers[q.id] || 'Not answered'}</p>
                      <p><strong>Correct answer:</strong> {q.correctAnswer}</p>
                      {!isCorrect && <p className="mt-2 text-sm text-muted-foreground"><strong>Explanation:</strong> {q.explanation}</p>}
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}
