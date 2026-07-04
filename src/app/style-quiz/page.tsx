import type { Metadata } from 'next';
import { FitQuizClient } from '@/components/quiz/fit-quiz-client';

export const metadata: Metadata = {
  title: 'Fit Quiz',
  description: 'Take the Seam & Sole fit quiz and get product recommendations with detailed outfit advice.'
};

export default function StyleQuizPage() {
  return <FitQuizClient />;
}
