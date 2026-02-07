import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import PageSection from '../components/PageSection';
import SignInGate from '../components/SignInGate';
import MicroSolutionsCommunityList from '../components/MicroSolutionsCommunityList';
import { proposalContent } from '../content/proposalContent';
import { useSubmitResilientLeadershipActivity, useGetNextActivity2Quote } from '../hooks/useQueries';
import { useActor } from '../hooks/useActor';
import { Users, Send, CheckCircle, Sparkles, RefreshCw, AlertCircle, Loader2 } from 'lucide-react';
import { generateActivity2Validation } from '../utils/activity2Validation';
import { formatQuoteGenre } from '../utils/quoteFormatting';
import { ChallengeTypeKey, mapChallengeTypeKeyToEnum } from '../utils/challengeTypeMapping';
import { toUserFacingError } from '../utils/userFacingError';
import { Quote } from '../backend';

const challengeOptions: { value: ChallengeTypeKey; label: string }[] = [
  { value: 'academicPressure', label: 'Academic Pressure' },
  { value: 'mentalHealth', label: 'Mental Health' },
  { value: 'financialStress', label: 'Financial Stress' },
  { value: 'onlineLearning', label: 'Online Learning' },
  { value: 'timeManagement', label: 'Time Management' },
  { value: 'bullying', label: 'Bullying' },
  { value: 'socialIsolation', label: 'Social Isolation' },
];

const protectiveFactorOptions = ['Support', 'Mentorship', 'Collaboration'];

interface LastSubmission {
  microSolution: string;
  protectiveFactor: string;
  villainResponse: string;
  heroicResponse: string;
  challengeType?: string;
  customChallenge?: string;
}

interface ValidationResult {
  citation: string;
  message: string;
  quote: Quote | null;
}

export default function Activity2ResilientLeadershipPage() {
  const navigate = useNavigate();
  const { actor, isFetching: isActorFetching } = useActor();
  const [challengeTypeKey, setChallengeTypeKey] = useState<ChallengeTypeKey | ''>('');
  const [customChallenge, setCustomChallenge] = useState('');
  const [villainResponse, setVillainResponse] = useState('');
  const [heroicResponse, setHeroicResponse] = useState('');
  const [protectiveFactor, setProtectiveFactor] = useState('');
  const [customProtectiveFactor, setCustomProtectiveFactor] = useState('');
  const [microSolution, setMicroSolution] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [lastSubmission, setLastSubmission] = useState<LastSubmission | null>(null);
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const [challengeError, setChallengeError] = useState('');
  const [submissionError, setSubmissionError] = useState<string>('');
  const [quoteError, setQuoteError] = useState<string>('');

  const submitMutation = useSubmitResilientLeadershipActivity();
  const getQuoteMutation = useGetNextActivity2Quote();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear any previous errors
    setChallengeError('');
    setSubmissionError('');

    // Client-side validation: require at least one challenge input
    const hasSelectedChallenge = challengeTypeKey !== '';
    const hasCustomChallenge = customChallenge.trim() !== '';

    if (!hasSelectedChallenge && !hasCustomChallenge) {
      setChallengeError('Please select a challenge from the list or describe your own challenge.');
      return;
    }

    // Check if actor is ready
    if (!actor || isActorFetching) {
      setSubmissionError('Connection is still initializing. Please wait a moment and try again.');
      return;
    }

    const finalProtectiveFactor =
      protectiveFactor === 'custom' ? customProtectiveFactor : protectiveFactor;

    try {
      // Enforce mutual exclusivity: when a challenge type is selected, submit customChallenge as null
      // When a custom challenge is provided, submit challengeType as null
      const mappedChallengeType = hasSelectedChallenge ? mapChallengeTypeKeyToEnum(challengeTypeKey) : null;
      const finalCustomChallenge = hasCustomChallenge && !hasSelectedChallenge ? customChallenge.trim() : null;

      await submitMutation.mutateAsync({
        challengeType: mappedChallengeType,
        customChallenge: finalCustomChallenge,
        villainResponse,
        heroicResponse,
        protectiveFactor: finalProtectiveFactor,
        microSolution,
      });
      
      // Store the submission for validation
      setLastSubmission({
        microSolution,
        protectiveFactor: finalProtectiveFactor,
        villainResponse,
        heroicResponse,
        challengeType: challengeTypeKey || undefined,
        customChallenge: customChallenge || undefined,
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
      
      const { citation, message } = generateActivity2Validation(lastSubmission);
      
      // Fetch quote from backend
      try {
        const fetchedQuote = await getQuoteMutation.mutateAsync();
        setValidationResult({
          citation,
          message,
          quote: fetchedQuote,
        });
      } catch (error) {
        console.error('Failed to fetch quote:', error);
        setQuoteError(toUserFacingError(error));
        setValidationResult({
          citation,
          message,
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
      
      const { citation, message } = generateActivity2Validation(lastSubmission);
      
      // Fetch next quote from backend
      try {
        const fetchedQuote = await getQuoteMutation.mutateAsync();
        setValidationResult({
          citation,
          message,
          quote: fetchedQuote,
        });
      } catch (error) {
        console.error('Failed to fetch quote:', error);
        setQuoteError(toUserFacingError(error));
      }
    }
  };

  const handleChallengeChange = (value: string) => {
    setChallengeTypeKey(value as ChallengeTypeKey | '');
    // Clear error when user makes a selection
    if (value || customChallenge.trim()) {
      setChallengeError('');
    }
  };

  const handleCustomChallengeChange = (value: string) => {
    setCustomChallenge(value);
    // Clear error when user types
    if (value.trim() || challengeTypeKey) {
      setChallengeError('');
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

                  {/* Research Citation */}
                  <div className="rounded-lg bg-accent/10 p-4 border border-accent/20">
                    <p className="text-xs font-semibold text-accent-foreground mb-2">
                      ALIGNED RESEARCH CITATION:
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {validationResult.citation}
                    </p>
                  </div>

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
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            {proposalContent.activities.activity2.commonChallenges.map((challenge, index) => (
              <li key={index}>{challenge}</li>
            ))}
          </ul>
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
                <label htmlFor="challengeType" className="block text-sm font-medium mb-2">
                  Select a Challenge
                </label>
                <select
                  id="challengeType"
                  value={challengeTypeKey}
                  onChange={(e) => {
                    handleChallengeChange(e.target.value);
                    handleInputChange();
                  }}
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
                  onChange={(e) => {
                    handleCustomChallengeChange(e.target.value);
                    handleInputChange();
                  }}
                  placeholder="Describe a custom challenge..."
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              {/* Challenge validation error */}
              {challengeError && (
                <div className="flex items-start gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                  <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                  <p className="text-sm text-destructive">{challengeError}</p>
                </div>
              )}

              <div>
                <label htmlFor="villainResponse" className="block text-sm font-medium mb-2">
                  What would the villain response look like? <span className="text-destructive">*</span>
                </label>
                <textarea
                  id="villainResponse"
                  value={villainResponse}
                  onChange={(e) => {
                    setVillainResponse(e.target.value);
                    handleInputChange();
                  }}
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
                  onChange={(e) => {
                    setHeroicResponse(e.target.value);
                    handleInputChange();
                  }}
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
                  onChange={(e) => {
                    setProtectiveFactor(e.target.value);
                    handleInputChange();
                  }}
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
                    onChange={(e) => {
                      setCustomProtectiveFactor(e.target.value);
                      handleInputChange();
                    }}
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
                  onChange={(e) => {
                    setMicroSolution(e.target.value);
                    handleInputChange();
                  }}
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
                  Share Your Micro-Solution
                </>
              )}
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
