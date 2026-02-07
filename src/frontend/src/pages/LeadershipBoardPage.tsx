import PageSection from '../components/PageSection';
import LeadershipWordPatternsSummary from '../components/LeadershipWordPatternsSummary';
import MicroSolutionsCommunityList from '../components/MicroSolutionsCommunityList';
import { TrendingUp } from 'lucide-react';

export default function LeadershipBoardPage() {
  return (
    <PageSection>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <TrendingUp className="h-10 w-10 text-primary" />
          <div>
            <h1 className="text-4xl font-bold text-foreground">Leadership Board</h1>
            <p className="text-muted-foreground mt-1">
              Community feedback and shared solutions from our leadership activities
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Column 1: Leadership Words */}
          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Leadership Words</h2>
            <LeadershipWordPatternsSummary />
          </div>

          {/* Column 2: Community Solutions */}
          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Community Solutions</h2>
            <MicroSolutionsCommunityList />
          </div>
        </div>
      </div>
    </PageSection>
  );
}
