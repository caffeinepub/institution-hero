import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import PageSection from '../components/PageSection';
import SignInGate from '../components/SignInGate';
import LeadershipWordPatternsSummary from '../components/LeadershipWordPatternsSummary';
import { proposalContent } from '../content/proposalContent';
import { useSubmitLeadershipWord, useGetNextActivity1Quote } from '../hooks/useQueries';
import { useActor } from '../hooks/useActor';
import { MessageSquare, Send, CheckCircle, Sparkles, AlertCircle, Loader2 } from 'lucide-react';
import { generateAffirmation } from '../utils/activity1Affirmations';
import { formatQuoteGenre } from '../utils/quoteFormatting';
import { toUserFacingError } from '../utils/userFacingError';
import { Quote } from '../backend';

export default function Activity1LeadershipWordPage() {
  const navigate = useNavigate();
  const { actor, isFetching: isActorFetching } = useActor();
  const [word, setWord] = useState('');
  const [why, setWhy] = useState('');
  const [roleModel, setRoleModel] = useState('');
  const [resilienceExample, setResilienceExample] = useState('');
  const [actionStep, setActionStep] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showAffirmation, setShowAffirmation] = useState(false);
  const [affirmationText, setAffirmationText] = useState('');
  const [quote, setQuote] = useState<Quote | null>(null);
  const [submissionError, setSubmissionError] = useState<string>('');
  const [quoteError, setQuoteError] = useState<string>('');

  const submitMutation = useSubmitLeadershipWord();
  const getQuoteMutation = useGetNextActivity1Quote();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear any previous errors
    setSubmissionError('');

    // Validate single word
    if (word.trim().split(/\s+/).length > 1) {
      setSubmissionError('Please enter only ONE word that describes the kind of leader you admire.');
      return;
    }

    // Check if actor is ready
    if (!actor || isActorFetching) {
      setSubmissionError('Connection is still initializing. Please wait a moment and try again.');
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
      setSubmissionError('');
    } catch (error) {
      console.error('Failed to submit:', error);
      setSubmissionError(toUserFacingError(error));
    }
  };

  const handleGenerateAffirmation = async () => {
    setQuoteError('');
    
    const affirmation = generateAffirmation({
      word,
      why,
      roleModel,
      resilienceExample,
      actionStep,
    });
    
    setAffirmationText(affirmation);
    
    // Fetch quote from backend
    try {
      const fetchedQuote = await getQuoteMutation.mutateAsync();
      if (fetchedQuote) {
        setQuote(fetchedQuote);
      } else {
        setQuoteError('No quote available at this time.');
      }
    } catch (error) {
      console.error('Failed to fetch quote:', error);
      setQuoteError(toUserFacingError(error));
    }
    
    setShowAffirmation(true);
  };

  const handleInputChange = () => {
    // Clear error when user edits inputs
    if (submissionError) {
      setSubmissionError('');
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

          {!showAffirmation && (
            <div className="mb-8">
              <button
                onClick={handleGenerateAffirmation}
                disabled={getQuoteMutation.isPending}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-lg bg-accent text-accent-foreground hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {getQuoteMutation.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Loading...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Get a Word of Affirmation
                  </>
                )}
              </button>
            </div>
          )}

          {showAffirmation && (
            <div className="mb-8 space-y-4">
              <div className="p-6 rounded-lg border border-border bg-card text-left">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="h-5 w-5 text-primary shrink-0" />
                  <h2 className="text-lg font-semibold text-foreground">Your Word of Affirmation</h2>
                </div>
                <p className="text-foreground leading-relaxed">{affirmationText}</p>
              </div>

              {quote && (
                <div className="p-6 rounded-lg border border-border bg-muted/50 text-left">
                  <div className="rounded-lg bg-background/50 p-4 border-l-4 border-primary">
                    <p className="text-foreground italic mb-2">
                      "{quote.quote}"
                    </p>
                    <p className="text-sm text-muted-foreground">
                      — {quote.attribution} ({formatQuoteGenre(quote.genre)})
                    </p>
                  </div>
                </div>
              )}

              {quoteError && (
                <div className="flex items-start gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                  <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                  <p className="text-sm text-destructive">{quoteError}</p>
                </div>
              )}
            </div>
          )}

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

  const isActorReady = !!actor && !isActorFetching;
  const isSubmitDisabled = submitMutation.isPending || !isActorReady;

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
          {/* Actor initialization message */}
          {!isActorReady && (
            <div className="mb-6 flex items-start gap-3 p-4 rounded-lg bg-muted border border-border">
              <Loader2 className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5 animate-spin" />
              <div>
                <p className="text-sm font-medium text-foreground">Connecting...</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Please wait while we establish a secure connection.
                </p>
              </div>
            </div>
          )}

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
                  onChange={(e) => {
                    setWord(e.target.value);
                    handleInputChange();
                  }}
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
                  onChange={(e) => {
                    setWhy(e.target.value);
                    handleInputChange();
                  }}
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
                  onChange={(e) => {
                    setRoleModel(e.target.value);
                    handleInputChange();
                  }}
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
                  onChange={(e) => {
                    setResilienceExample(e.target.value);
                    handleInputChange();
                  }}
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
                  onChange={(e) => {
                    setActionStep(e.target.value);
                    handleInputChange();
                  }}
                  placeholder="Your commitment for this week..."
                  required
                  rows={2}
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                />
              </div>
            </div>

            {/* Submission error message */}
            {submissionError && (
              <div className="flex items-start gap-3 p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-destructive">Submission Failed</p>
                  <p className="text-sm text-destructive/90 mt-1">{submissionError}</p>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitDisabled}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitMutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Share Your Leadership Word
                </>
              )}
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
