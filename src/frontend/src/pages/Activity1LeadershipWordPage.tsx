import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import PageSection from '../components/PageSection';
import SignInGate from '../components/SignInGate';
import LeadershipWordPatternsSummary from '../components/LeadershipWordPatternsSummary';
import { proposalContent } from '../content/proposalContent';
import { useSubmitLeadershipWord } from '../hooks/useQueries';
import { MessageSquare, Send, CheckCircle } from 'lucide-react';

export default function Activity1LeadershipWordPage() {
  const navigate = useNavigate();
  const [word, setWord] = useState('');
  const [why, setWhy] = useState('');
  const [roleModel, setRoleModel] = useState('');
  const [resilienceExample, setResilienceExample] = useState('');
  const [actionStep, setActionStep] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const submitMutation = useSubmitLeadershipWord();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate single word
    if (word.trim().split(/\s+/).length > 1) {
      alert('Please enter only ONE word that describes the kind of leader you admire.');
      return;
    }

    try {
      await submitMutation.mutateAsync({
        word: word.trim().toLowerCase(),
        why,
        roleModel,
        resilienceExample,
        actionStep,
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
            Your leadership word has been shared with the community.
          </p>
          <div className="mb-12">
            <LeadershipWordPatternsSummary />
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
          <MessageSquare className="h-10 w-10 text-primary" />
          <div>
            <h1 className="text-4xl font-bold text-foreground">
              {proposalContent.activities.activity1.title}
            </h1>
            <p className="text-muted-foreground mt-1">{proposalContent.activities.activity1.goal}</p>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-muted/50 p-6 mb-8">
          <h2 className="text-lg font-semibold mb-3">The Prompt</h2>
          <p className="text-foreground text-xl mb-2">{proposalContent.activities.activity1.prompt}</p>
          <p className="text-sm text-muted-foreground">
            Examples: {proposalContent.activities.activity1.examples}
          </p>
        </div>

        <SignInGate>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="rounded-lg border border-border bg-card p-6 space-y-6">
              <div>
                <label htmlFor="word" className="block text-sm font-medium mb-2">
                  Your Leadership Word <span className="text-destructive">*</span>
                </label>
                <input
                  id="word"
                  type="text"
                  value={word}
                  onChange={(e) => setWord(e.target.value)}
                  placeholder="Enter ONE word"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div>
                <label htmlFor="why" className="block text-sm font-medium mb-2">
                  Why did you choose that word? <span className="text-destructive">*</span>
                </label>
                <textarea
                  id="why"
                  value={why}
                  onChange={(e) => setWhy(e.target.value)}
                  placeholder="Share your reasoning..."
                  required
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                />
              </div>

              <div>
                <label htmlFor="roleModel" className="block text-sm font-medium mb-2">
                  Who in your life reflects that word? <span className="text-destructive">*</span>
                </label>
                <input
                  id="roleModel"
                  type="text"
                  value={roleModel}
                  onChange={(e) => setRoleModel(e.target.value)}
                  placeholder="Teacher, coach, peer, family member..."
                  required
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div>
                <label htmlFor="resilienceExample" className="block text-sm font-medium mb-2">
                  How does that word show resilience? <span className="text-destructive">*</span>
                </label>
                <textarea
                  id="resilienceExample"
                  value={resilienceExample}
                  onChange={(e) => setResilienceExample(e.target.value)}
                  placeholder="Describe how this quality demonstrates resilience..."
                  required
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                />
              </div>

              <div>
                <label htmlFor="actionStep" className="block text-sm font-medium mb-2">
                  What's one small action YOU can take this week that matches your leadership word?{' '}
                  <span className="text-destructive">*</span>
                </label>
                <textarea
                  id="actionStep"
                  value={actionStep}
                  onChange={(e) => setActionStep(e.target.value)}
                  placeholder="Your commitment for this week..."
                  required
                  rows={2}
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitMutation.isPending}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="h-4 w-4" />
              {submitMutation.isPending ? 'Submitting...' : 'Share Your Leadership Word'}
            </button>
          </form>
        </SignInGate>

        <div className="mt-12">
          <LeadershipWordPatternsSummary />
        </div>
      </div>
    </PageSection>
  );
}
