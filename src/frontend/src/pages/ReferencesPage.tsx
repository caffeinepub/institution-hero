import PageSection from '../components/PageSection';
import { REFERENCES } from '../content/references';
import { BookOpen } from 'lucide-react';

export default function ReferencesPage() {
  return (
    <PageSection>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <BookOpen className="h-10 w-10 text-primary" />
          <h1 className="text-4xl font-bold text-foreground">References</h1>
        </div>

        <p className="text-lg text-muted-foreground mb-8">
          Research foundations for this session on resilience and leadership in higher education:
        </p>

        <div className="space-y-4">
          {REFERENCES.map((reference, index) => (
            <div key={reference.key} className="p-4 rounded-lg border border-border bg-card">
              <p className="text-sm text-foreground leading-relaxed">{reference.text}</p>
            </div>
          ))}
        </div>
      </div>
    </PageSection>
  );
}
