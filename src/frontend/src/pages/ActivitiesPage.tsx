import PageSection from '../components/PageSection';
import { proposalContent } from '../content/proposalContent';
import { Link } from '@tanstack/react-router';
import { MessageSquare, Users, ArrowRight } from 'lucide-react';

export default function ActivitiesPage() {
  return (
    <PageSection>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Users className="h-10 w-10 text-primary" />
          <h1 className="text-4xl font-bold text-foreground">Interactive Activities</h1>
        </div>

        <p className="text-lg text-muted-foreground mb-12">
          Engage with these research-based exercises to develop your leadership identity and resilience.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Activity 1 */}
          <div className="rounded-lg border border-border bg-card overflow-hidden">
            <div className="p-6 bg-primary/5 border-b border-border">
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">Activity 1</h2>
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                {proposalContent.activities.activity1.title}
              </h3>
            </div>
            <div className="p-6">
              <p className="text-sm text-muted-foreground mb-4">
                <strong>Goal:</strong> {proposalContent.activities.activity1.goal}
              </p>
              <p className="text-muted-foreground mb-6">{proposalContent.activities.activity1.description}</p>
              <Link
                to="/activity-1"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors w-full justify-center"
              >
                Start Activity 1
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Activity 2 */}
          <div className="rounded-lg border border-border bg-card overflow-hidden">
            <div className="p-6 bg-primary/5 border-b border-border">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">Activity 2</h2>
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                {proposalContent.activities.activity2.title}
              </h3>
            </div>
            <div className="p-6">
              <p className="text-sm text-muted-foreground mb-4">
                <strong>Goal:</strong> {proposalContent.activities.activity2.goal}
              </p>
              <p className="text-muted-foreground mb-6">{proposalContent.activities.activity2.description}</p>
              <Link
                to="/activity-2"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors w-full justify-center"
              >
                Start Activity 2
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PageSection>
  );
}
