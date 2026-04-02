import HeroBanner from "../components/HeroBanner";
import PageSection from "../components/PageSection";
import { movieReferences } from "../content/movieReferences";

export default function MovieReferencesPage() {
  return (
    <div>
      <HeroBanner title="Movie References" />

      <PageSection>
        <div className="max-w-4xl mx-auto">
          <p className="text-muted-foreground mb-8">
            The following films and film series inspire the quotes used
            throughout the activities. These references demonstrate themes of
            resilience, leadership, and heroic action.
          </p>

          <div className="space-y-4">
            {movieReferences.map((reference) => (
              <div
                key={reference}
                className="p-6 rounded-lg border border-border bg-card hover:bg-accent/5 transition-colors"
              >
                <p className="text-foreground leading-relaxed">{reference}</p>
              </div>
            ))}
          </div>
        </div>
      </PageSection>
    </div>
  );
}
