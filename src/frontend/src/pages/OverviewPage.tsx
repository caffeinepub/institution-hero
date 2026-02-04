import PageSection from '../components/PageSection';
import { proposalContent } from '../content/proposalContent';
import { Users, Target } from 'lucide-react';
import { Link } from '@tanstack/react-router';

export default function OverviewPage() {
  return (
    <div>
      {/* Hero Banner */}
      <div className="relative w-full h-[400px] overflow-hidden border-b border-border/40">
        <img
          src="/assets/generated/institution-hero-banner.dim_1600x600.png"
          alt="Institution Hero Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto max-w-5xl">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
              {proposalContent.subtitle}
            </h1>
            <p className="text-lg text-muted-foreground">
              {proposalContent.author} • {proposalContent.organization}
            </p>
          </div>
        </div>
      </div>

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
