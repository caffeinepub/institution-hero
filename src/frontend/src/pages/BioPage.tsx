import PageSection from '../components/PageSection';
import { proposalContent } from '../content/proposalContent';
import { GraduationCap, Globe } from 'lucide-react';

export default function BioPage() {
  return (
    <PageSection>
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <GraduationCap className="h-10 w-10 text-primary" />
          <h1 className="text-4xl font-bold text-foreground">About the Author</h1>
        </div>

        <div className="rounded-lg border border-border bg-card p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">{proposalContent.author}</h2>
          <p className="text-muted-foreground mb-4">{proposalContent.organization}</p>
          <div className="h-px bg-border my-6" />
          <p className="text-foreground leading-relaxed">{proposalContent.bio}</p>
        </div>

        <div className="rounded-lg border border-border bg-muted/50 p-6">
          <div className="flex items-center gap-2 mb-3">
            <Globe className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">International Experience</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Study-abroad experiences in Berlin, Zurich, and Johannesburg continue to inspire work in
            resilience, culture, and ethical leadership across diverse educational contexts.
          </p>
        </div>
      </div>
    </PageSection>
  );
}
