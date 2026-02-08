import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import PageSection from '../components/PageSection';
import HeroBanner from '../components/HeroBanner';
import SignInGate from '../components/SignInGate';
import MicroSolutionsCommunityList from '../components/MicroSolutionsCommunityList';
import { proposalContent } from '../content/proposalContent';
import { useSubmitResilientLeadershipActivity, useGetNextActivity2Quote } from '../hooks/useQueries';
import { useActor } from '../hooks/useActor';
import { Sparkles, Send, CheckCircle, RefreshCw, AlertCircle, Loader2, Info, BookOpen } from 'lucide-react';
import { generateActivity2Validation, ValidationResult as ValidationData } from '../utils/activity2Validation';
import { toUserFacingError } from '../utils/userFacingError';
import { hasVillainousInput } from '../utils/isVillainousInput';
import { mapChallengeTypeKeyToEnum, type ChallengeTypeKey } from '../utils/challengeTypeMapping';
import { Quote } from '../backend';

interface LastSubmission {
  challengeType: ChallengeTypeKey | null;
  customChallenge: string;
  villainResponse: string;
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
  const { actor } = useActor();
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

      // Store the submission for validation
      setLastSubmission({
        challengeType,
        customChallenge,
        villainResponse,
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
    if (lastSubmission) {
      setQuoteError('');

      // Check for villainous input
      if (hasVillainousInput(
        lastSubmission.heroicResponse,
        lastSubmission.protectiveFactor,
        lastSubmission.microSolution
      )) {
        setQuoteError('Error 000: Only Heroic responses can be validated. Please ensure your input reflects positive leadership qualities.');
        return;
      }

      const validation = generateActivity2Validation({
        heroicResponse: lastSubmission.heroicResponse,
        protectiveFactor: lastSubmission.protectiveFactor,
        microSolution: lastSubmission.microSolution,
      });

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
    if (lastSubmission) {
      setQuoteError('');

      // Check for villainous input
      if (hasVillainousInput(
        lastSubmission.heroicResponse,
        lastSubmission.protectiveFactor,
        lastSubmission.microSolution
      )) {
        setQuoteError('Error 000: Only Heroic responses can be validated. Please ensure your input reflects positive leadership qualities.');
        return;
      }

      const validation = generateActivity2Validation({
        heroicResponse: lastSubmission.heroicResponse,
        protectiveFactor: lastSubmission.protectiveFactor,
        microSolution: lastSubmission.microSolution,
      });

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
    return (
      <div>
        <HeroBanner 
          title={proposalContent.activities.activity2.title}
          subtitle="Thank you for your submission!"
        />

        <PageSection>
          <div className="max-w-3xl mx-auto text-center">
            <CheckCircle className="h-16 w-16 text-primary mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-foreground mb-4">Thank You!</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Your resilient leadership response has been shared with the community.
            </p>

            {/* Validation Button and Result */}
            {!validationResult ? (
              <div className="mb-8">
                <button
                  onClick={handleGetValidation}
                  disabled={getQuoteMutation.isPending || !actor}
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
                      Get Your Validation
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
                      Your Resilient Leadership is Validated!
                    </h3>

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
                        disabled={getQuoteMutation.isPending || !actor}
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

            <SignInGate>
              <div className="mb-12">
                <MicroSolutionsCommunityList />
              </div>
            </SignInGate>

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

  const challengeOptions: { value: ChallengeTypeKey; label: string }[] = [
    { value: 'academicPressure', label: 'Academic Pressure' },
    { value: 'mentalHealth', label: 'Mental Health' },
    { value: 'financialStress', label: 'Financial Stress' },
    { value: 'onlineLearning', label: 'Online Learning' },
    { value: 'timeManagement', label: 'Time Management' },
    { value: 'bullying', label: 'Bullying' },
    { value: 'socialIsolation', label: 'Social Isolation' },
  ];

  return (
    <div>
      <HeroBanner 
        title={proposalContent.activities.activity2.title}
        subtitle={proposalContent.activities.activity2.goal}
      />

      <PageSection>
        <div className="max-w-3xl mx-auto">
          <div className="rounded-lg border border-border bg-muted/50 p-6 mb-4">
            <h2 className="text-lg font-semibold mb-3">Activity Description</h2>
            <p className="text-muted-foreground mb-4">{proposalContent.activities.activity2.description}</p>
            <div>
              <p className="text-sm font-medium mb-2">Common Challenges:</p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
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
                    setChallengeType((e.target.value as ChallengeTypeKey) || null);
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
                  Or describe your own challenge (optional)
                </label>
                <input
                  id="customChallenge"
                  type="text"
                  value={customChallenge}
                  onChange={(e) => {
                    setCustomChallenge(e.target.value);
                    handleInputChange();
                  }}
                  placeholder="Describe a specific leadership challenge..."
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div>
                <label htmlFor="villainResponse" className="block text-sm font-medium mb-2">
                  Villain Response <span className="text-destructive">*</span>
                </label>
                <textarea
                  id="villainResponse"
                  value={villainResponse}
                  onChange={(e) => {
                    setVillainResponse(e.target.value);
                    handleInputChange();
                  }}
                  placeholder="How might someone respond negatively to this challenge?"
                  required
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                />
              </div>

              <div>
                <label htmlFor="heroicResponse" className="block text-sm font-medium mb-2">
                  Heroic Response <span className="text-destructive">*</span>
                </label>
                <textarea
                  id="heroicResponse"
                  value={heroicResponse}
                  onChange={(e) => {
                    setHeroicResponse(e.target.value);
                    handleInputChange();
                  }}
                  placeholder="How would a resilient leader respond to this challenge?"
                  required
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                />
              </div>

              <div>
                <label htmlFor="protectiveFactor" className="block text-sm font-medium mb-2">
                  Protective Factor <span className="text-destructive">*</span>
                </label>
                <input
                  id="protectiveFactor"
                  type="text"
                  value={protectiveFactor}
                  onChange={(e) => {
                    setProtectiveFactor(e.target.value);
                    handleInputChange();
                  }}
                  placeholder="What strength or resource helps in this situation?"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div>
                <label htmlFor="microSolution" className="block text-sm font-medium mb-2">
                  Micro-Solution <span className="text-destructive">*</span>
                </label>
                <textarea
                  id="microSolution"
                  value={microSolution}
                  onChange={(e) => {
                    setMicroSolution(e.target.value);
                    handleInputChange();
                  }}
                  placeholder="What's one small, actionable step to address this challenge?"
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

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={submitMutation.isPending || !actor}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitMutation.isPending ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    Submit
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </PageSection>
    </div>
  );
}
