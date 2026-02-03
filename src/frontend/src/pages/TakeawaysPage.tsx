import PageSection from '../components/PageSection';
import { proposalContent } from '../content/proposalContent';
import { Lightbulb, Star } from 'lucide-react';

export default function TakeawaysPage() {
  return (
    <PageSection>
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Star className="h-10 w-10 text-primary" />
          <h1 className="text-4xl font-bold text-foreground">Key Takeaways</h1>
        </div>

        <p className="text-lg text-muted-foreground mb-8">
          Essential insights on resilience, leadership, and institutional transformation:
        </p>

        <div className="space-y-6">
          {proposalContent.takeaways.map((takeaway, index) => (
            <div key={index} className="rounded-lg border border-border bg-card p-6">
              <div className="flex items-start gap-3 mb-3">
                <Lightbulb className="h-5 w-5 text-primary shrink-0 mt-1" />
                <h3 className="text-xl font-semibold text-foreground">{takeaway.title}</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed pl-8">{takeaway.description}</p>
            </div>
          ))}
        </div>
      </div>
    </PageSection>
  );
}
