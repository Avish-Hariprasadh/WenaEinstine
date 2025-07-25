import { Button } from '@/components/ui/button';
import { ArrowLeft, Lightbulb } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export default function QuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-headline font-bold text-lg">
            <Lightbulb className="h-6 w-6 text-primary" />
            <span>Wena Einstien?</span>
          </Link>
          <Button variant="ghost" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Categories
            </Link>
          </Button>
        </div>
      </header>
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
