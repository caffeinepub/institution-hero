import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import PageSection from '../components/PageSection';
import SignInGate from '../components/SignInGate';
import MicroSolutionsCommunityList from '../components/MicroSolutionsCommunityList';
import { proposalContent } from '../content/proposalContent';
import { useSubmitResilientLeadershipActivity } from '../hooks/useQueries';
import { ChallengeType } from '../backend';
import { Users, Send, CheckCircle } from 'lucide-react';

const challengeOptions: { value: ChallengeType; label: string }[] = [
  { value: ChallengeType.academicPressure, label: 'Academic Pressure' },
  { value: ChallengeType.mentalHealth, label: 'Mental Health' },
  { value: ChallengeType.financialStress, label: 'Financial Stress' },
  { value: ChallengeType.onlineLearning, label: 'Online Learning' },
  { value: ChallengeType.timeManagement, label: 'Time Management' },
  { value: ChallengeType.bullying, label: 'Bullying' },
  { value: ChallengeType.socialIsolation, label: 'Social Isolation' },
];

const protectiveFactorOptions = ['Support', 'Mentorship', 'Collaboration'];

export default function Activity2ResilientLeadershipPage() {
  const navigate = useNavigate();
  const [challengeType, setChallengeType] = useState<ChallengeType | ''>('');
  const [customChallenge, setCustomChallenge] = useState('');
  const [villainResponse, setVillainResponse] = useState('');
  const [heroicResponse, setHeroicResponse] = useState('');
  const [protectiveFactor, setProtectiveFactor] = useState('');
  const [customProtectiveFactor, setCustomProtectiveFactor] = useState('');
  const [microSolution, setMicroSolution] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const submitMutation = useSubmitResilientLeadershipActivity();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const finalProtectiveFactor =
      protectiveFactor === 'custom' ? customProtectiveFactor : protectiveFactor;

    try {
      await submitMutation.mutateAsync({
        challengeType: challengeType || null,
        customChallenge: customChallenge || null,
        villainResponse,
        heroicResponse,
        protectiveFactor: finalProtectiveFactor,
        microSolution,
      });
      setSubmitted(true);
    } catch (error) {
      console.error('Failed to submit:', error);
      alert('Failed to submit your response. Please try again.');
    }
  };

  if (submitted) {
    return (
      <PageSection>
        <div className="max-w-3xl mx-auto text-center">
          <CheckCircle className="h-16 w-16 text-primary mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-foreground mb-4">Thank You!</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Your micro-solution has been shared with the community.
          </p>
          <div className="mb-12">
            <MicroSolutionsCommunityList />
          </div>
          <button
            onClick={() => navigate({ to: '/activities' })}
            className="px-6 py-3 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Back to Activities
          </button>
        </div>
      </PageSection>
    );
  }

  return (
    <PageSection>
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Users className="h-10 w-10 text-primary" />
          <div>
            <h1 className="text-4xl font-bold text-foreground">
              {proposalContent.activities.activity2.title}
            </h1>
            <p className="text-muted-foreground mt-1">{proposalContent.activities.activity2.goal}</p>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-muted/50 p-6 mb-8">
          <h2 className="text-lg font-semibold mb-3">Common Campus Challenges</h2>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            {proposalContent.activities.activity2.commonChallenges.map((challenge, index) => (
              <li key={index}>{challenge}</li>
            ))}
          </ul>
        </div>

        <SignInGate>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="rounded-lg border border-border bg-card p-6 space-y-6">
              <div>
                <label htmlFor="challengeType" className="block text-sm font-medium mb-2">
                  Select a Challenge
                </label>
                <select
                  id="challengeType"
                  value={challengeType}
                  onChange={(e) => setChallengeType(e.target.value as ChallengeType)}
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">-- Select a challenge --</option>
                  {challengeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="customChallenge" className="block text-sm font-medium mb-2">
                  Or Describe Your Own Challenge
                </label>
                <input
                  id="customChallenge"
                  type="text"
                  value={customChallenge}
                  onChange={(e) => setCustomChallenge(e.target.value)}
                  placeholder="Describe a custom challenge..."
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div>
                <label htmlFor="villainResponse" className="block text-sm font-medium mb-2">
                  What would the villain response look like? <span className="text-destructive">*</span>
                </label>
                <textarea
                  id="villainResponse"
                  value={villainResponse}
                  onChange={(e) => setVillainResponse(e.target.value)}
                  placeholder="Describe a destructive or unhelpful response..."
                  required
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                />
              </div>

              <div>
                <label htmlFor="heroicResponse" className="block text-sm font-medium mb-2">
                  What would the heroic response look like? <span className="text-destructive">*</span>
                </label>
                <textarea
                  id="heroicResponse"
                  value={heroicResponse}
                  onChange={(e) => setHeroicResponse(e.target.value)}
                  placeholder="Describe a constructive, resilient response..."
                  required
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                />
              </div>

              <div>
                <label htmlFor="protectiveFactor" className="block text-sm font-medium mb-2">
                  Which protective factor helps solve it? <span className="text-destructive">*</span>
                </label>
                <select
                  id="protectiveFactor"
                  value={protectiveFactor}
                  onChange={(e) => setProtectiveFactor(e.target.value)}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">-- Select a protective factor --</option>
                  {protectiveFactorOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                  <option value="custom">Custom</option>
                </select>
              </div>

              {protectiveFactor === 'custom' && (
                <div>
                  <label htmlFor="customProtectiveFactor" className="block text-sm font-medium mb-2">
                    Describe Your Protective Factor <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="customProtectiveFactor"
                    type="text"
                    value={customProtectiveFactor}
                    onChange={(e) => setCustomProtectiveFactor(e.target.value)}
                    placeholder="Enter your protective factor..."
                    required
                    className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              )}

              <div>
                <label htmlFor="microSolution" className="block text-sm font-medium mb-2">
                  Your Micro-Solution <span className="text-destructive">*</span>
                </label>
                <textarea
                  id="microSolution"
                  value={microSolution}
                  onChange={(e) => setMicroSolution(e.target.value)}
                  placeholder="Propose ONE small action a student leader could take..."
                  required
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Examples: {proposalContent.activities.activity2.microSolutionExamples.join(', ')}
                </p>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitMutation.isPending}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="h-4 w-4" />
              {submitMutation.isPending ? 'Submitting...' : 'Share Your Micro-Solution'}
            </button>
          </form>
        </SignInGate>

        <div className="mt-12">
          <MicroSolutionsCommunityList />
        </div>
      </div>
    </PageSection>
  );
}
