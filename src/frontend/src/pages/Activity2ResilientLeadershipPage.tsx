import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import PageSection from '../components/PageSection';
import SignInGate from '../components/SignInGate';
import MicroSolutionsCommunityList from '../components/MicroSolutionsCommunityList';
import { proposalContent } from '../content/proposalContent';
import { useSubmitResilientLeadershipActivity, useGetNextActivity2Quote } from '../hooks/useQueries';
import { useActor } from '../hooks/useActor';
import { Shield, Send, CheckCircle, RefreshCw, AlertCircle, Loader2, Info, BookOpen } from 'lucide-react';
import { generateActivity2Validation, ValidationResult as ValidationData } from '../utils/activity2Validation';
import { toUserFacingError } from '../utils/userFacingError';
import { hasVillainousInput } from '../utils/isVillainousInput';
import { mapChallengeTypeKeyToEnum } from '../utils/challengeTypeMapping';
import { Quote } from '../backend';

const CHALLENGE_OPTIONS = [
  { value: 'academicPressure', label: 'Academic Pressure' },
  { value: 'mentalHealth', label: 'Mental Health' },
  { value: 'financialStress', label: 'Financial Stress' },
  { value: 'onlineLearning', label: 'Online Learning' },
  { value: 'timeManagement', label: 'Time Management' },
  { value: 'bullying', label: 'Bullying' },
  { value: 'socialIsolation', label: 'Social Isolation' },
];

interface LastSubmission {
  heroicResponse: string;
  protectiveFactor: string;
  microSolution: string;
}

interface ValidationResult {
  validation: ValidationData;
  quote: Quote | null;
}

export default function Activity2ResilientLeadershipPage() {
  const navigate = useNavigate();
  const { actor, isFetching: isActorFetching } = useActor();
  const [challengeType, setChallengeType] = useState<string | null>(null);
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
      const challengeEnum = challengeType ? mapChallengeTypeKeyToEnum(challengeType as any) : null;

      await submitMutation.mutateAsync({
        challengeType: challengeEnum,
        customChallenge: customChallenge || null,
        villainResponse,
        heroicResponse,
        protectiveFactor,
        microSolution,
      });

      // Store the submission for validation
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

  const handleGetValidation = async () => {
    // Check if actor is ready before fetching quote
    if (!actor || isActorFetching) {
      setQuoteError('Connection is still initializing. Please wait a moment and try again.');
      return;
    }

    if (lastSubmission) {
      setQuoteError('');

      // Check for villainous input in heroic fields
      if (hasVillainousInput(
        lastSubmission.heroicResponse,
        lastSubmission.protectiveFactor,
        lastSubmission.microSolution
      )) {
        setQuoteError('Error 000: Only Heroic responses can be validated. Please ensure your input reflects positive leadership qualities.');
        return;
      }

      const validation = generateActivity2Validation(lastSubmission);

      // Fetch quote from backend
      try {
        const fetchedQuote = await getQuoteMutation.mutateAsync();
        setValidationResult({
          validation,
          quote: fetchedQuote,
        });
      } catch (error) {
        console.error('Failed to fetch quote:', error);
        setQuoteError(toUserFacingError(error));
        setValidationResult({
          validation,
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

      // Check for villainous input in heroic fields
      if (hasVillainousInput(
        lastSubmission.heroicResponse,
        lastSubmission.protectiveFactor,
        lastSubmission.microSolution
      )) {
        setQuoteError('Error 000: Only Heroic responses can be validated. Please ensure your input reflects positive leadership qualities.');
        return;
      }

      const validation = generateActivity2Validation(lastSubmission);

      // Fetch next quote from backend
      try {
        const fetchedQuote = await getQuoteMutation.mutateAsync();
        setValidationResult({
          validation,
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
                onClick={handleGetValidation}
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
                    <Shield className="h-5 w-5" />
                    Validate My Micro-Solution
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="mb-8 rounded-lg border border-border bg-card p-6 text-left space-y-4">
              <div className="flex items-start gap-3">
                <Shield className="h-6 w-6 text-primary shrink-0 mt-1" />
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-foreground mb-3">
                    Your Micro-Solution is Validated!
                  </h2>

                  <p className="text-muted-foreground mb-4">
                    {validationResult.validation.message}
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
                      {validationResult.validation.reference.text}
                    </p>
                  </div>

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
          <Shield className="h-10 w-10 text-primary" />
          <div>
            <h1 className="text-4xl font-bold text-foreground">
              {proposalContent.activities.activity2.title}
            </h1>
            <p className="text-muted-foreground mt-1">{proposalContent.activities.activity2.goal}</p>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-muted/50 p-6 mb-4">
          <h2 className="text-lg font-semibold mb-3">Activity Instructions</h2>
          <p className="text-muted-foreground mb-4">{proposalContent.activities.activity2.description}</p>
          <div>
            <p className="text-sm font-medium mb-2">Common Challenges:</p>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              {proposalContent.activities.activity2.commonChallenges.map((challenge, index) => (
                <li key={index}>{challenge}</li>
              ))}
            </ul>
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
                <label htmlFor="challengeType" className="block text-sm font-medium mb-2">
                  Select a Leadership Challenge
                </label>
                <select
                  id="challengeType"
                  value={challengeType || ''}
                  onChange={(e) => {
                    setChallengeType(e.target.value || null);
                    handleInputChange();
                  }}
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">-- Select a challenge --</option>
                  {CHALLENGE_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="customChallenge" className="block text-sm font-medium mb-2">
                  Or describe your own challenge
                </label>
                <textarea
                  id="customChallenge"
                  value={customChallenge}
                  onChange={(e) => {
                    setCustomChallenge(e.target.value);
                    handleInputChange();
                  }}
                  placeholder="Describe a specific leadership challenge you're facing..."
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                />
              </div>

              <div>
                <label htmlFor="villainResponse" className="block text-sm font-medium mb-2">
                  Villain Response <span className="text-destructive">*</span>
                </label>
                <p className="text-xs text-muted-foreground mb-2">
                  What would a destructive response look like?
                </p>
                <textarea
                  id="villainResponse"
                  value={villainResponse}
                  onChange={(e) => {
                    setVillainResponse(e.target.value);
                    handleInputChange();
                  }}
                  placeholder="Describe a negative or destructive way to respond..."
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
                  What would a resilient, constructive response look like?
                </p>
                <textarea
                  id="heroicResponse"
                  value={heroicResponse}
                  onChange={(e) => {
                    setHeroicResponse(e.target.value);
                    handleInputChange();
                  }}
                  placeholder="Describe a positive, resilient way to respond..."
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
                  What resource or strength helps you respond resiliently?
                </p>
                <textarea
                  id="protectiveFactor"
                  value={protectiveFactor}
                  onChange={(e) => {
                    setProtectiveFactor(e.target.value);
                    handleInputChange();
                  }}
                  placeholder="E.g., support network, mindfulness practice, problem-solving skills..."
                  required
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                />
              </div>

              <div>
                <label htmlFor="microSolution" className="block text-sm font-medium mb-2">
                  Micro-Solution <span className="text-destructive">*</span>
                </label>
                <p className="text-xs text-muted-foreground mb-2">
                  What small, actionable step can you take today?
                </p>
                <textarea
                  id="microSolution"
                  value={microSolution}
                  onChange={(e) => {
                    setMicroSolution(e.target.value);
                    handleInputChange();
                  }}
                  placeholder="Describe one concrete action you can take..."
                  required
                  rows={3}
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
                  Submit My Micro-Solution For Feedback
                </>
              )}
            </button>
          </form>
        </SignInGate>
      </div>
    </PageSection>
  );
}
