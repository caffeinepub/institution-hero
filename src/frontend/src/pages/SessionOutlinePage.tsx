import PageSection from '../components/PageSection';
import { proposalContent } from '../content/proposalContent';
import { Clock, Calendar } from 'lucide-react';

export default function SessionOutlinePage() {
  const totalMinutes = proposalContent.sessionOutline.reduce((sum, item) => sum + item.duration, 0);

  return (
    <PageSection>
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Calendar className="h-10 w-10 text-primary" />
          <h1 className="text-4xl font-bold text-foreground">Session Outline</h1>
        </div>

        <div className="rounded-lg border border-border bg-muted/50 p-6 mb-8">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-5 w-5" />
            <span className="text-lg font-semibold">Total Duration: {totalMinutes} minutes</span>
          </div>
        </div>

        <div className="space-y-4">
          {proposalContent.sessionOutline.map((item, index) => (
            <div key={index} className="flex gap-4 p-6 rounded-lg border border-border bg-card">
              <div className="shrink-0 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">{item.duration}</span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-foreground mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.duration} minutes</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-6 rounded-lg border border-border bg-card">
          <h3 className="text-lg font-semibold mb-3">Facilitation Notes</h3>
          <p className="text-muted-foreground leading-relaxed">
            This session is designed to be interactive and reflective. Allow time for participants to engage
            deeply with each activity, share their insights, and connect with the community patterns that
            emerge. The activities build on research in resilience theory, leadership identity development,
            and compassionate pedagogy.
          </p>
        </div>
      </div>
    </PageSection>
  );
}
