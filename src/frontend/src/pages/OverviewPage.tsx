import PageSection from '../components/PageSection';
import HeroBanner from '../components/HeroBanner';
import { proposalContent } from '../content/proposalContent';
import { Users, Target } from 'lucide-react';
import { Link } from '@tanstack/react-router';

export default function OverviewPage() {
  return (
    <div>
      <HeroBanner title={proposalContent.subtitle} />

      <PageSection>
        <div className="prose prose-lg max-w-none">
          <h2 className="text-3xl font-bold mb-6 text-foreground">Abstract</h2>
          <p className="text-muted-foreground leading-relaxed mb-8">{proposalContent.abstractShort}</p>

          <div className="my-12 p-6 rounded-lg bg-muted/50 border border-border">
            <h3 className="text-xl font-semibold mb-4 text-foreground">Full Abstract</h3>
            <p className="text-muted-foreground leading-relaxed">{proposalContent.abstract}</p>
          </div>

          {/* Quick Links */}
          <div className="grid md:grid-cols-2 gap-6 my-12">
            <Link
              to="/activities"
              className="group p-6 rounded-lg border border-border bg-card hover:bg-accent transition-colors"
            >
              <Users className="h-8 w-8 text-primary mb-3" />
              <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                Interactive Activities
              </h3>
              <p className="text-sm text-muted-foreground">
                Engage with leadership exercises and share your insights
              </p>
            </Link>

            <Link
              to="/learning-outcomes"
              className="group p-6 rounded-lg border border-border bg-card hover:bg-accent transition-colors"
            >
              <Target className="h-8 w-8 text-primary mb-3" />
              <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                Learning Outcomes
              </h3>
              <p className="text-sm text-muted-foreground">
                Discover what you'll gain from this session
              </p>
            </Link>
          </div>
        </div>
      </PageSection>
    </div>
  );
}
