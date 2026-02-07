import { useLeadershipWordCounts } from '../hooks/useQueries';
import { BarChart3, TrendingUp } from 'lucide-react';

interface LeadershipWordPatternsSummaryProps {
  enablePolling?: boolean;
  pollingIntervalMs?: number;
}

export default function LeadershipWordPatternsSummary({
  enablePolling = false,
  pollingIntervalMs = 3000,
}: LeadershipWordPatternsSummaryProps) {
  const { data: wordCounts, isLoading } = useLeadershipWordCounts(
    enablePolling ? { refetchInterval: pollingIntervalMs } : undefined
  );

  if (isLoading) {
    return (
      <div className="rounded-lg border border-border bg-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Community Patterns</h3>
        </div>
        <p className="text-muted-foreground">Loading patterns...</p>
      </div>
    );
  }

  if (!wordCounts || wordCounts.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Community Patterns</h3>
        </div>
        <p className="text-muted-foreground">
          No submissions yet. Be the first to share your leadership word!
        </p>
      </div>
    );
  }

  // Sort by count descending and take top 10
  const sortedWords = [...wordCounts].sort((a, b) => Number(b[1]) - Number(a[1])).slice(0, 10);
  const maxCount = sortedWords.length > 0 ? Number(sortedWords[0][1]) : 1;

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Top Leadership Words</h3>
      </div>
      <p className="text-sm text-muted-foreground mb-6">
        These are the most valued leadership qualities in our community:
      </p>
      <div className="space-y-3">
        {sortedWords.map(([word, count]) => {
          const percentage = (Number(count) / maxCount) * 100;
          return (
            <div key={word} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium capitalize">{word}</span>
                <span className="text-muted-foreground">{count.toString()}</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
