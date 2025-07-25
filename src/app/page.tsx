import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { quizCategories } from '@/data/quizzes';
import { Lightbulb, type LucideIcon } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const iconMap: Record<string, LucideIcon> = {
  'South African History': require('lucide-react').BookOpenText,
  'Wildlife & Nature': require('lucide-react').Leaf,
  'Geography': require('lucide-react').Globe,
  'Famous Landmarks': require('lucide-react').Landmark,
  'Arts & Culture': require('lucide-react').Palette,
  'Music & Entertainment': require('lucide-react').Music,
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-8 md:p-12">
      <header className="text-center mb-10 md:mb-16">
        <div className="flex justify-center items-center gap-4 mb-2">
          <Lightbulb className="w-10 h-10 md:w-14 md:h-14 text-primary" />
          <h1 className="text-4xl md:text-6xl font-headline font-bold text-gray-800">
            Wena Einstien?
          </h1>
        </div>
        <p className="text-lg md:text-xl text-muted-foreground font-body max-w-2xl">
          Think you know Mzansi? Put your knowledge to the test with our fun quizzes and get AI-powered tips to become a true expert!
        </p>
      </header>

      <div className="w-full max-w-6xl">
        <h2 className="text-2xl md:text-3xl font-headline font-semibold mb-6 text-center md:text-left">Choose a Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {quizCategories.map((category) => {
            const IconComponent = iconMap[category.title] || Lightbulb;
            return (
              <Link href={`/quiz/${category.slug}`} key={category.slug} className="group">
                <Card className="h-full flex flex-col transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2 hover:border-primary">
                  <CardHeader>
                    <div className="relative h-40 w-full mb-4 rounded-t-lg overflow-hidden">
                       <Image
                          src={`https://placehold.co/600x400.png`}
                          alt={category.title}
                          data-ai-hint={category.imageHint}
                          fill
                          className="object-cover"
                        />
                         <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                    </div>
                    <div className="flex items-center gap-3">
                      <IconComponent className="w-8 h-8 text-accent" />
                      <CardTitle className="font-headline text-xl">{category.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <CardDescription>{category.description}</CardDescription>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
