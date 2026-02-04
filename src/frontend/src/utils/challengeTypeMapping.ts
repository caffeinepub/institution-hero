import { ChallengeType } from '../backend';

/**
 * Stable string keys for challenge types used in the UI.
 * These keys are used as HTML option values and mapped to ChallengeType variants before backend submission.
 */
export type ChallengeTypeKey =
  | 'academicPressure'
  | 'mentalHealth'
  | 'financialStress'
  | 'onlineLearning'
  | 'timeManagement'
  | 'bullying'
  | 'socialIsolation';

/**
 * Maps UI string keys to ChallengeType enum variants for backend submission.
 */
export function mapChallengeTypeKeyToEnum(key: ChallengeTypeKey): ChallengeType {
  const mapping: Record<ChallengeTypeKey, ChallengeType> = {
    academicPressure: ChallengeType.academicPressure,
    mentalHealth: ChallengeType.mentalHealth,
    financialStress: ChallengeType.financialStress,
    onlineLearning: ChallengeType.onlineLearning,
    timeManagement: ChallengeType.timeManagement,
    bullying: ChallengeType.bullying,
    socialIsolation: ChallengeType.socialIsolation,
  };
  return mapping[key];
}
