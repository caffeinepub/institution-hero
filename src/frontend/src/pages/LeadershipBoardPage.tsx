import PageSection from '../components/PageSection';
import HeroBanner from '../components/HeroBanner';
import LeadershipWordPatternsSummary from '../components/LeadershipWordPatternsSummary';
import MicroSolutionsCommunityList from '../components/MicroSolutionsCommunityList';

export default function LeadershipBoardPage() {
  return (
    <div>
      <HeroBanner 
        title="Leadership Board"
        subtitle="Community feedback and shared solutions from our leadership activities"
      />

      <PageSection>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Column 1: Leadership Words */}
            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Leadership Words</h2>
              <LeadershipWordPatternsSummary enablePolling pollingIntervalMs={4000} />
            </div>

            {/* Column 2: Community Solutions */}
            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Community Solutions</h2>
              <MicroSolutionsCommunityList enablePolling pollingIntervalMs={4000} />
            </div>
          </div>
        </div>
      </PageSection>
    </div>
  );
}
