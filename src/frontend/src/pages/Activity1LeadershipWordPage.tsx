import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import PageSection from '../components/PageSection';
import HeroBanner from '../components/HeroBanner';
import SignInGate from '../components/SignInGate';
import LeadershipWordPatternsSummary from '../components/LeadershipWordPatternsSummary';
import { proposalContent } from '../content/proposalContent';
import { useSubmitLeadershipWord, useGetNextActivity1Quote } from '../hooks/useQueries';
import { useActor } from '../hooks/useActor';
import { Sparkles, Send, CheckCircle, RefreshCw, AlertCircle, Loader2, Info, BookOpen } from 'lucide-react';
import { generateAffirmation, AffirmationResult as AffirmationData } from '../utils/activity1Affirmations';
import { toUserFacingError } from '../utils/userFacingError';
import { hasVillainousInput } from '../utils/isVillainousInput';
import { Quote } from '../backend';

interface LastSubmission {
  word: string;
  why: string;
  roleModel: string;
  resilienceExample: string;
  actionStep: string;
}

interface AffirmationResult {
  affirmation: AffirmationData;
  quote: Quote | null;
}

export default function Activity1LeadershipWordPage() {
  const navigate = useNavigate();
  const { actor, isFetching: isActorFetching } = useActor();
  const [word, setWord] = useState('');
  const [why, setWhy] = useState('');
  const [roleModel, setRoleModel] = useState('');
  const [resilienceExample, setResilienceExample] = useState('');
  const [actionStep, setActionStep] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [lastSubmission, setLastSubmission] = useState<LastSubmission | null>(null);
  const [affirmationResult, setAffirmationResult] = useState<AffirmationResult | null>(null);
  const [submissionError, setSubmissionError] = useState<string>('');
  const [quoteError, setQuoteError] = useState<string>('');

  const submitMutation = useSubmitLeadershipWord();
  const getQuoteMutation = useGetNextActivity1Quote();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear any previous errors
    setSubmissionError('');

    // Check if actor is ready
    if (!actor || isActorFetching) {
      setSubmissionError('Connection is still initializing. Please wait a moment and try again.');
      return;
    }

    try {
      await submitMutation.mutateAsync({
        word,
        why,
        roleModel,
        resilienceExample,
        actionStep,
      });
      
      // Store the submission for affirmation
      setLastSubmission({
        word,
        why,
        roleModel,
        resilienceExample,
        actionStep,
      });
      
      setSubmitted(true);
      setAffirmationResult(null);
      setSubmissionError('');
    } catch (error) {
      console.error('Failed to submit:', error);
      setSubmissionError(toUserFacingError(error));
    }
  };

  const handleGetAffirmation = async () => {
    // Check if actor is ready before fetching quote
    if (!actor || isActorFetching) {
      setQuoteError('Connection is still initializing. Please wait a moment and try again.');
      return;
    }

    if (lastSubmission) {
      setQuoteError('');
      
      // Check for villainous input
      if (hasVillainousInput(
        lastSubmission.word,
        lastSubmission.why,
        lastSubmission.roleModel,
        lastSubmission.resilienceExample,
        lastSubmission.actionStep
      )) {
        setQuoteError('Error 000: Only Heroic responses can be validated. Please ensure your input reflects positive leadership qualities.');
        return;
      }
      
      const affirmation = generateAffirmation(lastSubmission);
      
      // Fetch quote from backend
      try {
        const fetchedQuote = await getQuoteMutation.mutateAsync();
        setAffirmationResult({
          affirmation,
          quote: fetchedQuote,
        });
      } catch (error) {
        console.error('Failed to fetch quote:', error);
        setQuoteError(toUserFacingError(error));
        setAffirmationResult({
          affirmation,
          quote: null,
        });
      }
    }
  };

  const handleGenerateAnother = async () => {
    // Check if actor is ready before fetching quote
    if (!actor || isActorFetching) {
      setQuoteError('Connection is still initializing. Please wait a moment and try again.');
      return;
    }

    if (lastSubmission) {
      setQuoteError('');
      
      // Check for villainous input
      if (hasVillainousInput(
        lastSubmission.word,
        lastSubmission.why,
        lastSubmission.roleModel,
        lastSubmission.resilienceExample,
        lastSubmission.actionStep
      )) {
        setQuoteError('Error 000: Only Heroic responses can be validated. Please ensure your input reflects positive leadership qualities.');
        return;
      }
      
      const affirmation = generateAffirmation(lastSubmission);
      
      // Fetch next quote from backend
      try {
        const fetchedQuote = await getQuoteMutation.mutateAsync();
        setAffirmationResult({
          affirmation,
          quote: fetchedQuote,
        });
      } catch (error) {
        console.error('Failed to fetch quote:', error);
        setQuoteError(toUserFacingError(error));
      }
    }
  };

  const handleInputChange = () => {
    // Clear submission error when user edits inputs
    if (submissionError) {
      setSubmissionError('');
    }
  };

  if (submitted) {
    const isActorReady = !!actor && !isActorFetching;

    return (
      <div>
        <HeroBanner 
          title={proposalContent.activities.activity1.title}
          subtitle="Thank you for your submission!"
        />

        <PageSection>
          <div className="max-w-3xl mx-auto text-center">
            <CheckCircle className="h-16 w-16 text-primary mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-foreground mb-4">Thank You!</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Your leadership word has been shared with the community.
            </p>

            {/* Affirmation Button and Result */}
            {!affirmationResult ? (
              <div className="mb-8">
                <button
                  onClick={handleGetAffirmation}
                  disabled={getQuoteMutation.isPending || !isActorReady}
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-lg bg-accent text-accent-foreground hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {getQuoteMutation.isPending ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-5 w-5" />
                      Get Your Affirmation
                    </>
                  )}
                </button>
              </div>
            ) : (
              <div className="mb-8 rounded-lg border border-border bg-card p-6 text-left space-y-4">
                <div className="flex items-start gap-3">
                  <Sparkles className="h-6 w-6 text-primary shrink-0 mt-1" />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      Your Leadership Word is Affirmed!
                    </h3>
                    
                    <p className="text-muted-foreground mb-4">
                      {affirmationResult.affirmation.message}
                    </p>

                    {/* Academic Reference */}
                    <div className="rounded-lg bg-muted/30 p-4 mb-4 border-l-4 border-accent">
                      <div className="flex items-start gap-2 mb-2">
                        <BookOpen className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                        <p className="text-xs font-semibold text-accent uppercase tracking-wide">
                          Academic Reference
                        </p>
                      </div>
                      <p className="text-sm text-foreground leading-relaxed">
                        {affirmationResult.affirmation.reference.text}
                      </p>
                    </div>

                    {/* Quote */}
                    {affirmationResult.quote && (
                      <div className="rounded-lg bg-muted/50 p-4 mb-4 border-l-4 border-primary">
                        <p className="text-foreground italic mb-3">
                          "{affirmationResult.quote.quote}"
                        </p>
                        {affirmationResult.quote.attribution && (
                          <p className="text-sm text-muted-foreground mb-1">
                            — {affirmationResult.quote.attribution}
                          </p>
                        )}
                        <p className="text-xs text-muted-foreground font-medium">
                          Source: {affirmationResult.quote.movieReference}
                        </p>
                      </div>
                    )}

                    {quoteError && (
                      <div className="flex items-start gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20 mb-4">
                        <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                        <p className="text-sm text-destructive">{quoteError}</p>
                      </div>
                    )}

                    {/* Generate Another Button */}
                    <div className="mt-4 flex justify-end">
                      <button
                        onClick={handleGenerateAnother}
                        disabled={getQuoteMutation.isPending || !isActorReady}
                        className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {getQuoteMutation.isPending ? (
                          <>
                            <Loader2 className="h-3 w-3 animate-spin" />
                            Loading...
                          </>
                        ) : (
                          <>
                            <RefreshCw className="h-3 w-3" />
                            Generate Another
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {quoteError && !affirmationResult && (
              <div className="flex items-start gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20 mb-8">
                <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                <p className="text-sm text-destructive">{quoteError}</p>
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
      </div>
    );
  }

  const isActorReady = !!actor && !isActorFetching;
  const isSubmitDisabled = submitMutation.isPending || !isActorReady;

  // Parse examples from comma-separated string
  const examplesArray = proposalContent.activities.activity1.examples
    .split(',')
    .map((ex) => ex.trim())
    .filter((ex) => ex.length > 0);

  return (
    <div>
      <HeroBanner 
        title={proposalContent.activities.activity1.title}
        subtitle={proposalContent.activities.activity1.goal}
      />

      <PageSection>
        <div className="max-w-3xl mx-auto">
          <div className="rounded-lg border border-border bg-muted/50 p-6 mb-4">
            <h2 className="text-lg font-semibold mb-3">Prompt</h2>
            <p className="text-muted-foreground mb-4">{proposalContent.activities.activity1.prompt}</p>
            <div>
              <p className="text-sm font-medium mb-2">Examples:</p>
              <div className="flex flex-wrap gap-2">
                {examplesArray.map((example, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium"
                  >
                    {example}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-4 mb-8 flex items-start gap-3">
            <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground">
              Your information is anonymous the only information we see is what is on the top leadership word community solutions
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
                    placeholder="e.g., Resilient, Empathetic, Visionary..."
                    required
                    className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>

                <div>
                  <label htmlFor="why" className="block text-sm font-medium mb-2">
                    Why does this word resonate with you? <span className="text-destructive">*</span>
                  </label>
                  <textarea
                    id="why"
                    value={why}
                    onChange={(e) => {
                      setWhy(e.target.value);
                      handleInputChange();
                    }}
                    placeholder="Share your personal connection to this leadership quality..."
                    required
                    rows={3}
                    className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                  />
                </div>

                <div>
                  <label htmlFor="roleModel" className="block text-sm font-medium mb-2">
                    Who embodies this quality? <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="roleModel"
                    type="text"
                    value={roleModel}
                    onChange={(e) => {
                      setRoleModel(e.target.value);
                      handleInputChange();
                    }}
                    placeholder="Name a role model or leader..."
                    required
                    className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>

                <div>
                  <label htmlFor="resilienceExample" className="block text-sm font-medium mb-2">
                    How does this quality relate to resilience? <span className="text-destructive">*</span>
                  </label>
                  <textarea
                    id="resilienceExample"
                    value={resilienceExample}
                    onChange={(e) => {
                      setResilienceExample(e.target.value);
                      handleInputChange();
                    }}
                    placeholder="Describe the connection between this quality and resilience..."
                    required
                    rows={3}
                    className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                  />
                </div>

                <div>
                  <label htmlFor="actionStep" className="block text-sm font-medium mb-2">
                    One action step to develop this quality <span className="text-destructive">*</span>
                  </label>
                  <textarea
                    id="actionStep"
                    value={actionStep}
                    onChange={(e) => {
                      setActionStep(e.target.value);
                      handleInputChange();
                    }}
                    placeholder="What's one concrete step you can take?"
                    required
                    rows={2}
                    className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                  />
                </div>
              </div>

              {submissionError && (
                <div className="flex items-start gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                  <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                  <p className="text-sm text-destructive">{submissionError}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitDisabled}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitMutation.isPending ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    Submit My Leadership Word
                  </>
                )}
              </button>
            </form>
          </SignInGate>
        </div>
      </PageSection>
    </div>
  );
}
