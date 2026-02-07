import PageSection from '../components/PageSection';
import { Film } from 'lucide-react';
import { movieReferences } from '../content/movieReferences';

export default function MovieReferencesPage() {
  return (
    <PageSection>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Film className="h-10 w-10 text-primary" />
          <h1 className="text-4xl font-bold text-foreground">Movie References</h1>
        </div>

        <p className="text-muted-foreground mb-8">
          The following films and film series inspire the quotes used throughout the activities. These
          references demonstrate themes of resilience, leadership, and heroic action.
        </p>

        <div className="space-y-4">
          {movieReferences.map((reference, index) => (
            <div
              key={index}
              className="p-6 rounded-lg border border-border bg-card hover:bg-accent/5 transition-colors"
            >
              <p className="text-foreground leading-relaxed">{reference}</p>
            </div>
          ))}
        </div>
      </div>
    </PageSection>
  );
}
