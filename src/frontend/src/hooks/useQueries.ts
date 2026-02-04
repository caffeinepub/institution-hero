import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { ChallengeType, Quote } from '../backend';

export function useLeadershipWordCounts() {
  const { actor, isFetching } = useActor();

  return useQuery<[string, bigint][]>({
    queryKey: ['leadershipWordCounts'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getLeadershipWordCounts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitLeadershipWord() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      word,
      why,
      roleModel,
      resilienceExample,
      actionStep,
    }: {
      word: string;
      why: string;
      roleModel: string;
      resilienceExample: string;
      actionStep: string;
    }) => {
      if (!actor) {
        throw new Error('Actor not initialized');
      }
      return actor.submitLeadershipWord(word, why, roleModel, resilienceExample, actionStep);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leadershipWordCounts'] });
    },
  });
}

export function useMicroSolutions() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['microSolutions'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllMicroSolutions();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitResilientLeadershipActivity() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      challengeType,
      customChallenge,
      villainResponse,
      heroicResponse,
      protectiveFactor,
      microSolution,
    }: {
      challengeType: ChallengeType | null;
      customChallenge: string | null;
      villainResponse: string;
      heroicResponse: string;
      protectiveFactor: string;
      microSolution: string;
    }) => {
      if (!actor) {
        throw new Error('Actor not initialized');
      }
      
      // Ensure optional parameters are passed as null (never undefined)
      const normalizedChallengeType = challengeType ?? null;
      const normalizedCustomChallenge = customChallenge ?? null;
      
      try {
        return await actor.submitResilientLeadershipActivity(
          normalizedChallengeType,
          normalizedCustomChallenge,
          villainResponse,
          heroicResponse,
          protectiveFactor,
          microSolution
        );
      } catch (error) {
        // Normalize error for consistent handling
        if (error instanceof Error) {
          throw error;
        }
        if (typeof error === 'string') {
          throw new Error(error);
        }
        throw new Error('Failed to submit resilient leadership activity');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['microSolutions'] });
    },
  });
}

export function useGetNextActivity1Quote() {
  const { actor } = useActor();

  return useMutation<Quote | null, Error>({
    mutationFn: async () => {
      if (!actor) {
        throw new Error('Actor not initialized');
      }
      return actor.getNextActivity1Quote();
    },
  });
}

export function useGetNextActivity2Quote() {
  const { actor } = useActor();

  return useMutation<Quote | null, Error>({
    mutationFn: async () => {
      if (!actor) {
        throw new Error('Actor not initialized');
      }
      return actor.getNextActivity2Quote();
    },
  });
}
