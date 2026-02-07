import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { ChallengeType, Quote, ResilientLeadershipActivity } from '../backend';

export function useLeadershipWordCounts(options?: { refetchInterval?: number }) {
  const { actor, isFetching } = useActor();

  return useQuery<[string, bigint][]>({
    queryKey: ['leadershipWordCounts'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getLeadershipWordCounts();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: options?.refetchInterval,
    refetchIntervalInBackground: !!options?.refetchInterval,
    placeholderData: (previousData) => previousData,
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
    onSuccess: (_data, variables) => {
      // Optimistically update the cache
      queryClient.setQueryData<[string, bigint][]>(
        ['leadershipWordCounts'],
        (oldData) => {
          if (!oldData) return [[variables.word, BigInt(1)]];
          
          // Find if the word already exists
          const existingIndex = oldData.findIndex(([w]) => w === variables.word);
          
          if (existingIndex >= 0) {
            // Increment existing word count
            const newData = [...oldData];
            newData[existingIndex] = [variables.word, oldData[existingIndex][1] + BigInt(1)];
            return newData;
          } else {
            // Add new word with count 1
            return [...oldData, [variables.word, BigInt(1)]];
          }
        }
      );
      
      // Still invalidate to reconcile with backend
      queryClient.invalidateQueries({ queryKey: ['leadershipWordCounts'] });
    },
  });
}

export function useMicroSolutions(options?: { refetchInterval?: number }) {
  const { actor, isFetching } = useActor();

  return useQuery<ResilientLeadershipActivity[]>({
    queryKey: ['microSolutions'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllMicroSolutions();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: options?.refetchInterval,
    refetchIntervalInBackground: !!options?.refetchInterval,
    placeholderData: (previousData) => previousData,
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
    onSuccess: (_data, variables) => {
      // Optimistically update the cache
      queryClient.setQueryData<ResilientLeadershipActivity[]>(
        ['microSolutions'],
        (oldData) => {
          const newSolution: ResilientLeadershipActivity = {
            challengeType: variables.challengeType || undefined,
            customChallenge: variables.customChallenge || undefined,
            villainResponse: variables.villainResponse,
            heroicResponse: variables.heroicResponse,
            protectiveFactor: variables.protectiveFactor,
            microSolution: variables.microSolution,
          };
          
          if (!oldData) return [newSolution];
          return [...oldData, newSolution];
        }
      );
      
      // Still invalidate to reconcile with backend
      queryClient.invalidateQueries({ queryKey: ['microSolutions'] });
    },
  });
}

export function useGetNextActivity1Quote() {
  const { actor } = useActor();

  return useMutation<Quote, Error>({
    mutationFn: async () => {
      if (!actor) {
        throw new Error('Actor not initialized');
      }
      try {
        return await actor.getNextActivity1Quote();
      } catch (error) {
        if (error instanceof Error) {
          throw error;
        }
        if (typeof error === 'string') {
          throw new Error(error);
        }
        throw new Error('Failed to fetch quote');
      }
    },
  });
}

export function useGetNextActivity2Quote() {
  const { actor } = useActor();

  return useMutation<Quote, Error>({
    mutationFn: async () => {
      if (!actor) {
        throw new Error('Actor not initialized');
      }
      try {
        return await actor.getNextActivity2Quote();
      } catch (error) {
        if (error instanceof Error) {
          throw error;
        }
        if (typeof error === 'string') {
          throw new Error(error);
        }
        throw new Error('Failed to fetch quote');
      }
    },
  });
}
