import { useMicroSolutions } from '../hooks/useQueries';
import { Users, Lightbulb, Shield } from 'lucide-react';
import { ChallengeType } from '../backend';

const challengeLabels: Record<ChallengeType, string> = {
  [ChallengeType.academicPressure]: 'Academic Pressure',
  [ChallengeType.mentalHealth]: 'Mental Health',
  [ChallengeType.financialStress]: 'Financial Stress',
  [ChallengeType.onlineLearning]: 'Online Learning',
  [ChallengeType.timeManagement]: 'Time Management',
  [ChallengeType.bullying]: 'Bullying',
  [ChallengeType.socialIsolation]: 'Social Isolation',
};

interface MicroSolutionsCommunityListProps {
  enablePolling?: boolean;
  pollingIntervalMs?: number;
}

export default function MicroSolutionsCommunityList({
  enablePolling = false,
  pollingIntervalMs = 3000,
}: MicroSolutionsCommunityListProps) {
  const { data: solutions, isLoading } = useMicroSolutions(
    enablePolling ? { refetchInterval: pollingIntervalMs } : undefined
  );

  if (isLoading) {
    return (
      <div className="rounded-lg border border-border bg-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <Users className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">community solutions</h3>
        </div>
        <p className="text-muted-foreground">Loading solutions...</p>
      </div>
    );
  }

  if (!solutions || solutions.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <Users className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">community solutions</h3>
        </div>
        <p className="text-muted-foreground">
          No solutions shared yet. Be the first to contribute a micro-solution!
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <div className="flex items-center gap-2 mb-4">
        <Users className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">community solutions</h3>
      </div>
      <p className="text-sm text-muted-foreground mb-6">
        Heroic responses from student leaders addressing real campus challenges:
      </p>
      <div className="space-y-4 max-h-[600px] overflow-y-auto">
        {solutions.map((solution, index) => (
          <div key={index} className="p-4 rounded-lg bg-muted/50 border border-border/50 space-y-2">
            <div className="flex items-start gap-2">
              <Lightbulb className="h-5 w-5 text-primary mt-0.5 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm mb-1">
                  {solution.challengeType
                    ? challengeLabels[solution.challengeType]
                    : solution.customChallenge || 'Custom Challenge'}
                </p>
                <p className="text-foreground">{solution.microSolution}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground pl-7">
              <Shield className="h-3 w-3" />
              <span className="capitalize">{solution.protectiveFactor}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
