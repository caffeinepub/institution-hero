import { selectValidReferenceByHash } from './referenceSelection';
import { ReferenceEntry } from '../content/references';

interface Activity2Input {
  heroicResponse: string;
  protectiveFactor: string;
  microSolution: string;
}

export interface ValidationResult {
  message: string;
  reference: ReferenceEntry;
}

// Theme-to-reference mapping (using only existing reference keys)
const THEME_REFERENCES: Record<string, string[]> = {
  resilience: ['erickson2017', 'wang2025', 'jansen2024'],
  leadership: ['northouse2022', 'sunderman2024', 'ramamoorthi2023'],
  growth: ['fazio2008', 'wang2025'],
  support: ['waddington2025', 'killingback2025'],
  mindfulness: ['killingback2025', 'waddington2025'],
  identity: ['sunderman2024', 'ramamoorthi2023'],
  transformation: ['mcgrath2022', 'elliott1996'],
  community: ['erickson2015', 'ramamoorthi2023'],
  destructive: ['erickson2015', 'ghamrawi2024', 'bienkowska2025'],
  compassion: ['waddington2025', 'killingback2025'],
  ethical: ['anastasiou2025', 'northouse2022'],
};

// Keywords for theme detection (only from heroic fields)
const THEME_KEYWORDS: Record<string, string[]> = {
  resilience: ['resilient', 'bounce back', 'overcome', 'adapt', 'persevere', 'recover', 'strength'],
  leadership: ['lead', 'guide', 'inspire', 'motivate', 'influence', 'empower', 'vision'],
  growth: ['grow', 'learn', 'develop', 'improve', 'progress', 'evolve', 'mindset'],
  support: ['support', 'help', 'community', 'friend', 'mentor', 'network', 'connection'],
  mindfulness: ['mindful', 'aware', 'present', 'reflect', 'meditation', 'conscious'],
  identity: ['identity', 'self', 'who i am', 'values', 'authentic', 'purpose'],
  transformation: ['transform', 'change', 'shift', 'transition', 'evolve', 'breakthrough'],
  community: ['community', 'together', 'collective', 'group', 'team', 'collaborate'],
  destructive: ['toxic', 'negative', 'harmful', 'destructive', 'damage'],
  compassion: ['compassion', 'empathy', 'care', 'kindness', 'understanding'],
  ethical: ['ethical', 'moral', 'integrity', 'honest', 'fair', 'just'],
};

function detectThemes(input: Activity2Input): string[] {
  const text = `${input.heroicResponse} ${input.protectiveFactor} ${input.microSolution}`.toLowerCase();
  const detectedThemes: string[] = [];

  for (const [theme, keywords] of Object.entries(THEME_KEYWORDS)) {
    if (keywords.some((keyword) => text.includes(keyword.toLowerCase()))) {
      detectedThemes.push(theme);
    }
  }

  return detectedThemes.length > 0 ? detectedThemes : ['resilience'];
}

function selectReference(input: Activity2Input, themes: string[]): ReferenceEntry {
  // Collect candidate keys from detected themes
  const candidateKeys: string[] = [];
  for (const theme of themes) {
    const refs = THEME_REFERENCES[theme];
    if (refs && refs.length > 0) {
      candidateKeys.push(...refs);
    }
  }

  // If no candidates found, use default resilience references
  if (candidateKeys.length === 0) {
    candidateKeys.push(...(THEME_REFERENCES.resilience || []));
  }

  // Select a valid reference based on the input
  const combinedInput = `${input.heroicResponse}${input.protectiveFactor}${input.microSolution}`;
  return selectValidReferenceByHash(combinedInput, candidateKeys);
}

function generateMessage(input: Activity2Input, themes: string[]): string {
  const messages = [
    `Your heroic response demonstrates the power of resilience in action. By choosing to ${input.heroicResponse.toLowerCase()}, you're embodying the protective factor of ${input.protectiveFactor.toLowerCase()}. This micro-solution—${input.microSolution.toLowerCase()}—is a concrete step toward positive change.`,
    `The protective factor you've identified—${input.protectiveFactor.toLowerCase()}—is a key strength in your resilience toolkit. Your micro-solution shows practical wisdom: ${input.microSolution.toLowerCase()}. This heroic response reflects true leadership.`,
    `Your approach to this challenge shows remarkable insight. By leveraging ${input.protectiveFactor.toLowerCase()} and committing to ${input.microSolution.toLowerCase()}, you're creating a path forward that others can learn from.`,
    `This heroic response—${input.heroicResponse.toLowerCase()}—demonstrates the kind of adaptive leadership that transforms challenges into opportunities. Your protective factor of ${input.protectiveFactor.toLowerCase()} provides a strong foundation.`,
  ];

  const index = themes.length % messages.length;
  return messages[index];
}

export function generateActivity2Validation(input: Activity2Input): ValidationResult {
  const themes = detectThemes(input);
  const reference = selectReference(input, themes);
  const message = generateMessage(input, themes);

  return {
    message,
    reference,
  };
}
