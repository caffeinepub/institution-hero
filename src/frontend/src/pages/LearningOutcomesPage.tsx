import PageSection from '../components/PageSection';
import { proposalContent } from '../content/proposalContent';
import { CheckCircle2, Target } from 'lucide-react';

export default function LearningOutcomesPage() {
  return (
    <PageSection>
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Target className="h-10 w-10 text-primary" />
          <h1 className="text-4xl font-bold text-foreground">Learning Outcomes</h1>
        </div>

        <p className="text-lg text-muted-foreground mb-8">
          By the end of this session, participants will be able to:
        </p>

        <div className="space-y-6">
          {proposalContent.learningOutcomes.map((outcome, index) => (
            <div key={index} className="flex gap-4 p-6 rounded-lg border border-border bg-card">
              <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-foreground mb-2">Outcome {index + 1}</h3>
                <p className="text-muted-foreground leading-relaxed">{outcome}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageSection>
  );
}
