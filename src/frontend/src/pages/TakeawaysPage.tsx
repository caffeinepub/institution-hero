import { Lightbulb } from "lucide-react";
import HeroBanner from "../components/HeroBanner";
import PageSection from "../components/PageSection";
import { proposalContent } from "../content/proposalContent";

export default function TakeawaysPage() {
  return (
    <div>
      <HeroBanner title="Key Takeaways" />

      <PageSection>
        <div className="max-w-3xl mx-auto">
          <p className="text-lg text-muted-foreground mb-8">
            Essential insights on resilience, leadership, and institutional
            transformation:
          </p>

          <div className="space-y-6">
            {proposalContent.takeaways.map((takeaway, _index) => (
              <div
                key={takeaway.title}
                className="rounded-lg border border-border bg-card p-6"
              >
                <div className="flex items-start gap-3 mb-3">
                  <Lightbulb className="h-5 w-5 text-primary shrink-0 mt-1" />
                  <h3 className="text-xl font-semibold text-foreground">
                    {takeaway.title}
                  </h3>
                </div>
                <p className="text-muted-foreground leading-relaxed pl-8">
                  {takeaway.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </PageSection>
    </div>
  );
}
