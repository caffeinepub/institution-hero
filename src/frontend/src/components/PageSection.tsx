import { ReactNode } from 'react';

interface PageSectionProps {
  children: ReactNode;
  className?: string;
}

export default function PageSection({ children, className = '' }: PageSectionProps) {
  return (
    <section className={`container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-5xl ${className}`}>
      {children}
    </section>
  );
}
