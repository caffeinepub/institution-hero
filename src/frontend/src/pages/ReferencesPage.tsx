import HeroBanner from "../components/HeroBanner";
import PageSection from "../components/PageSection";
import { REFERENCES } from "../content/references";

export default function ReferencesPage() {
  return (
    <div>
      <HeroBanner title="References" />

      <PageSection>
        <div className="max-w-4xl mx-auto">
          <p className="text-lg text-muted-foreground mb-8">
            Research foundations for this session on resilience and leadership
            in higher education:
          </p>

          <div className="space-y-4">
            {REFERENCES.map((reference, _index) => (
              <div
                key={reference.key}
                className="p-4 rounded-lg border border-border bg-card"
              >
                <p className="text-sm text-foreground leading-relaxed">
                  {reference.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </PageSection>
    </div>
  );
}
