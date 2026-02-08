import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { ChallengeType, Quote, ResilientLeadershipActivity, UserProfile } from '../backend';

// User Profile Queries
export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

// Activity 1: Leadership Word Submissions
export function useSubmitLeadershipWord() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      word: string;
      why: string;
      roleModel: string;
      resilienceExample: string;
      actionStep: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.submitLeadershipWord(
        data.word,
        data.why,
        data.roleModel,
        data.resilienceExample,
        data.actionStep
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leadershipWordCounts'] });
    },
  });
}

export function useGetLeadershipWordCounts(pollingInterval?: number) {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<Array<[string, bigint]>>({
    queryKey: ['leadershipWordCounts'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getLeadershipWordCounts();
    },
    enabled: !!actor && !actorFetching,
    refetchInterval: pollingInterval,
  });
}

// Activity 2: Resilient Leadership Activity Submissions
export function useSubmitResilientLeadershipActivity() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      challengeType: ChallengeType | null;
      customChallenge: string | null;
      villainResponse: string;
      heroicResponse: string;
      protectiveFactor: string;
      microSolution: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.submitResilientLeadershipActivity(
        data.challengeType,
        data.customChallenge,
        data.villainResponse,
        data.heroicResponse,
        data.protectiveFactor,
        data.microSolution
      );
    },
    onSuccess: (_, variables) => {
      // Optimistically update the cache by appending the new submission
      queryClient.setQueryData<ResilientLeadershipActivity[]>(
        ['microSolutions'],
        (old) => {
          if (!old) return old;
          const newActivity: ResilientLeadershipActivity = {
            challengeType: variables.challengeType || undefined,
            customChallenge: variables.customChallenge || undefined,
            villainResponse: variables.villainResponse,
            heroicResponse: variables.heroicResponse,
            protectiveFactor: variables.protectiveFactor,
            microSolution: variables.microSolution,
          };
          return [...old, newActivity];
        }
      );
      queryClient.invalidateQueries({ queryKey: ['microSolutions'] });
    },
  });
}

export function useGetAllMicroSolutions(pollingInterval?: number) {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<ResilientLeadershipActivity[]>({
    queryKey: ['microSolutions'],
    queryFn: async () => {
      if (!actor) return [];
      const result = await actor.getAllMicroSolutions();
      return result.reverse();
    },
    enabled: !!actor && !actorFetching,
    refetchInterval: pollingInterval,
  });
}

// Quote Fetching
export function useGetNextActivity1Quote() {
  const { actor } = useActor();

  return useMutation<Quote>({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getNextActivity1Quote();
    },
  });
}

export function useGetNextActivity2Quote() {
  const { actor } = useActor();

  return useMutation<Quote>({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getNextActivity2Quote();
    },
  });
}
