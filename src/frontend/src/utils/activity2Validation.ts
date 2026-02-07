import { REFERENCES } from '../content/references';

interface Activity2Input {
  heroicResponse: string;
  protectiveFactor: string;
  microSolution: string;
}

interface ValidationResult {
  citation: string;
  message: string;
}

// Theme-to-reference mapping (using only heroic fields)
const THEME_REFERENCES: Record<string, string[]> = {
  resilience: ['masten2001', 'luthar2000', 'rutter2012'],
  leadership: ['northouse2022', 'bass1985', 'burns1978'],
  growth: ['dweck2006', 'yeager2012'],
  support: ['cohen2004', 'thoits2011'],
  mindfulness: ['kabatZinn2003', 'brown2007'],
  identity: ['erikson1968', 'marcia1980'],
  transformation: ['mezirow1991', 'kegan1982'],
  community: ['putnam2000', 'erickson2015'],
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

function selectCitation(themes: string[]): string {
  for (const theme of themes) {
    const refs = THEME_REFERENCES[theme];
    if (refs && refs.length > 0) {
      const randomRef = refs[Math.floor(Math.random() * refs.length)];
      const reference = REFERENCES.find((r) => r.key === randomRef);
      if (reference) {
        return reference.text;
      }
    }
  }
  return REFERENCES[0].text;
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
  const citation = selectCitation(themes);
  const message = generateMessage(input, themes);

  return {
    citation,
    message,
  };
}
