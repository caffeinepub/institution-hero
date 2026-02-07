import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import PageSection from '../components/PageSection';
import SignInGate from '../components/SignInGate';
import MicroSolutionsCommunityList from '../components/MicroSolutionsCommunityList';
import { proposalContent } from '../content/proposalContent';
import { useSubmitResilientLeadershipActivity, useGetNextActivity2Quote } from '../hooks/useQueries';
import { useActor } from '../hooks/useActor';
import { Users, Send, CheckCircle, Sparkles, RefreshCw, AlertCircle, Loader2, Info } from 'lucide-react';
import { generateActivity2Validation } from '../utils/activity2Validation';
import { formatQuoteGenre } from '../utils/quoteFormatting';
import { ChallengeTypeKey, mapChallengeTypeKeyToEnum } from '../utils/challengeTypeMapping';
import { toUserFacingError } from '../utils/userFacingError';
import { hasVillainousInput } from '../utils/isVillainousInput';
import { Quote } from '../backend';

interface LastSubmission {
  heroicResponse: string;
  protectiveFactor: string;
  microSolution: string;
}

interface ValidationResult {
  citation: string;
  message: string;
  quote: Quote | null;
}

const CHALLENGE_OPTIONS: ChallengeTypeKey[] = [
  'academicPressure',
  'mentalHealth',
  'financialStress',
  'onlineLearning',
  'timeManagement',
  'bullying',
  'socialIsolation',
];

export default function Activity2ResilientLeadershipPage() {
  const navigate = useNavigate();
  const { actor, isFetching: isActorFetching } = useActor();
  const [challengeType, setChallengeType] = useState<ChallengeTypeKey | null>(null);
  const [customChallenge, setCustomChallenge] = useState('');
  const [villainResponse, setVillainResponse] = useState('');
  const [heroicResponse, setHeroicResponse] = useState('');
  const [protectiveFactor, setProtectiveFactor] = useState('');
  const [microSolution, setMicroSolution] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [lastSubmission, setLastSubmission] = useState<LastSubmission | null>(null);
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const [submissionError, setSubmissionError] = useState<string>('');
  const [quoteError, setQuoteError] = useState<string>('');

  const submitMutation = useSubmitResilientLeadershipActivity();
  const getQuoteMutation = useGetNextActivity2Quote();

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
      const challengeTypeEnum = challengeType ? mapChallengeTypeKeyToEnum(challengeType) : null;

      await submitMutation.mutateAsync({
        challengeType: challengeTypeEnum,
        customChallenge: customChallenge || null,
        villainResponse,
        heroicResponse,
        protectiveFactor,
        microSolution,
      });

      // Store the submission for validation (only heroic fields)
      setLastSubmission({
        heroicResponse,
        protectiveFactor,
        microSolution,
      });

      setSubmitted(true);
      setValidationResult(null);
      setSubmissionError('');
    } catch (error) {
      console.error('Failed to submit:', error);
      setSubmissionError(toUserFacingError(error));
    }
  };

  const handleValidate = async () => {
    // Check if actor is ready before fetching quote
    if (!actor || isActorFetching) {
      setQuoteError('Connection is still initializing. Please wait a moment and try again.');
      return;
    }

    if (lastSubmission) {
      setQuoteError('');

      // Check for villainous input in heroic fields only
      if (hasVillainousInput(
        lastSubmission.heroicResponse,
        lastSubmission.protectiveFactor,
        lastSubmission.microSolution
      )) {
        setQuoteError('Error 000: Only Heroic responses can be validated. Please ensure your input reflects positive leadership qualities and solutions.');
        return;
      }

      const validation = generateActivity2Validation(lastSubmission);

      // Fetch quote from backend
      try {
        const fetchedQuote = await getQuoteMutation.mutateAsync();
        setValidationResult({
          citation: validation.citation,
          message: validation.message,
          quote: fetchedQuote,
        });
      } catch (error) {
        console.error('Failed to fetch quote:', error);
        setQuoteError(toUserFacingError(error));
        setValidationResult({
          citation: validation.citation,
          message: validation.message,
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

      // Check for villainous input in heroic fields only
      if (hasVillainousInput(
        lastSubmission.heroicResponse,
        lastSubmission.protectiveFactor,
        lastSubmission.microSolution
      )) {
        setQuoteError('Error 000: Only Heroic responses can be validated. Please ensure your input reflects positive leadership qualities and solutions.');
        return;
      }

      const validation = generateActivity2Validation(lastSubmission);

      // Fetch next quote from backend
      try {
        const fetchedQuote = await getQuoteMutation.mutateAsync();
        setValidationResult({
          citation: validation.citation,
          message: validation.message,
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
      <PageSection>
        <div className="max-w-3xl mx-auto text-center">
          <CheckCircle className="h-16 w-16 text-primary mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-foreground mb-4">Thank You!</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Your micro-solution has been shared with the community.
          </p>

          {/* Validation Button and Result */}
          {!validationResult ? (
            <div className="mb-8">
              <button
                onClick={handleValidate}
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
                    Validate My Micro-Solution
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="mb-8 rounded-lg border border-border bg-card p-6 text-left space-y-4">
              <div className="flex items-start gap-3">
                <Sparkles className="h-6 w-6 text-primary shrink-0 mt-1" />
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-foreground mb-3">
                    Your Micro-Solution is Validated!
                  </h2>

                  <p className="text-muted-foreground mb-4">
                    {validationResult.message}
                  </p>

                  {/* Quote */}
                  {validationResult.quote && (
                    <div className="rounded-lg bg-muted/50 p-4 mb-4 border-l-4 border-primary">
                      <p className="text-foreground italic mb-3">
                        "{validationResult.quote.quote}"
                      </p>
                      {validationResult.quote.attribution && (
                        <p className="text-sm text-muted-foreground mb-1">
                          — {validationResult.quote.attribution}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground font-medium">
                        Source: {validationResult.quote.movieReference}
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

          {quoteError && !validationResult && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20 mb-8">
              <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
              <p className="text-sm text-destructive">{quoteError}</p>
            </div>
          )}

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

  const isActorReady = !!actor && !isActorFetching;
  const isSubmitDisabled = submitMutation.isPending || !isActorReady;

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
          <p className="text-muted-foreground mb-4">
            Select a challenge or describe your own, then explore both villain and heroic responses.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {CHALLENGE_OPTIONS.map((challenge) => (
              <button
                key={challenge}
                type="button"
                onClick={() => {
                  setChallengeType(challenge);
                  handleInputChange();
                }}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  challengeType === challenge
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card text-foreground hover:bg-muted border border-border'
                }`}
              >
                {challenge
                  .replace(/([A-Z])/g, ' $1')
                  .trim()
                  .split(' ')
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' ')}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-4 mb-8 flex items-start gap-3">
          <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
          <p className="text-sm text-muted-foreground">
            Your information is anonymous the only information we see is what is on the community solutions
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
                <label htmlFor="customChallenge" className="block text-sm font-medium mb-2">
                  Describe Your Challenge (Optional)
                </label>
                <textarea
                  id="customChallenge"
                  value={customChallenge}
                  onChange={(e) => {
                    setCustomChallenge(e.target.value);
                    handleInputChange();
                  }}
                  placeholder="If none of the above fit, describe your specific challenge..."
                  rows={2}
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                />
              </div>

              <div>
                <label htmlFor="villainResponse" className="block text-sm font-medium mb-2">
                  Villain Response <span className="text-destructive">*</span>
                </label>
                <p className="text-xs text-muted-foreground mb-2">
                  How might someone respond negatively or destructively to this challenge?
                </p>
                <textarea
                  id="villainResponse"
                  value={villainResponse}
                  onChange={(e) => {
                    setVillainResponse(e.target.value);
                    handleInputChange();
                  }}
                  placeholder="e.g., Give up, blame others, avoid responsibility..."
                  required
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                />
              </div>

              <div>
                <label htmlFor="heroicResponse" className="block text-sm font-medium mb-2">
                  Heroic Response <span className="text-destructive">*</span>
                </label>
                <p className="text-xs text-muted-foreground mb-2">
                  How can you respond with resilience and leadership?
                </p>
                <textarea
                  id="heroicResponse"
                  value={heroicResponse}
                  onChange={(e) => {
                    setHeroicResponse(e.target.value);
                    handleInputChange();
                  }}
                  placeholder="e.g., Seek support, develop a plan, take responsibility..."
                  required
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                />
              </div>

              <div>
                <label htmlFor="protectiveFactor" className="block text-sm font-medium mb-2">
                  Protective Factor <span className="text-destructive">*</span>
                </label>
                <p className="text-xs text-muted-foreground mb-2">
                  What strength or resource helps you respond heroically?
                </p>
                <input
                  id="protectiveFactor"
                  type="text"
                  value={protectiveFactor}
                  onChange={(e) => {
                    setProtectiveFactor(e.target.value);
                    handleInputChange();
                  }}
                  placeholder="e.g., Social support, self-awareness, growth mindset..."
                  required
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div>
                <label htmlFor="microSolution" className="block text-sm font-medium mb-2">
                  Micro-Solution <span className="text-destructive">*</span>
                </label>
                <p className="text-xs text-muted-foreground mb-2">
                  What's one small, concrete action you can take?
                </p>
                <textarea
                  id="microSolution"
                  value={microSolution}
                  onChange={(e) => {
                    setMicroSolution(e.target.value);
                    handleInputChange();
                  }}
                  placeholder="e.g., Schedule 15 minutes daily for self-care, reach out to one friend..."
                  required
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                />
              </div>
            </div>

            {/* Submission error */}
            {submissionError && (
              <div className="flex items-start gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                <p className="text-sm text-destructive">{submissionError}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitDisabled}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitMutation.isPending ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  Share Your Micro-Solution
                </>
              )}
            </button>
          </form>
        </SignInGate>
      </div>
    </PageSection>
  );
}
