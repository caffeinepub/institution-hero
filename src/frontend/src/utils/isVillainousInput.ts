/**
 * Utility to detect villainous/negative input using keyword matching.
 * Returns true if the input contains negative/villainous language.
 */

const VILLAINOUS_KEYWORDS = [
  // Negative emotions and states
  'hate', 'hatred', 'angry', 'rage', 'furious', 'vengeful', 'revenge',
  'destroy', 'destruction', 'kill', 'death', 'die', 'hurt', 'harm',
  'evil', 'wicked', 'malicious', 'cruel', 'vicious', 'brutal',
  
  // Negative actions
  'attack', 'assault', 'abuse', 'bully', 'harass', 'threaten',
  'manipulate', 'deceive', 'lie', 'cheat', 'steal', 'betray',
  
  // Negative qualities
  'worthless', 'useless', 'hopeless', 'pathetic', 'weak', 'failure',
  'stupid', 'idiot', 'dumb', 'incompetent', 'inferior',
  
  // Extreme negativity
  'never', 'impossible', 'can\'t', 'won\'t', 'refuse', 'give up',
  'quit', 'surrender', 'defeat', 'lose', 'loser',
  
  // Villainous character traits
  'selfish', 'greedy', 'corrupt', 'dishonest', 'unethical',
  'immoral', 'unjust', 'unfair', 'discriminate', 'prejudice',
];

const VILLAINOUS_PHRASES = [
  'give up', 'can\'t do', 'won\'t try', 'not worth', 'no point',
  'don\'t care', 'doesn\'t matter', 'who cares', 'screw it',
  'hate myself', 'hate everyone', 'hate them', 'hate this',
];

/**
 * Checks if the given text contains villainous/negative language
 */
export function isVillainousInput(text: string): boolean {
  if (!text || text.trim().length === 0) {
    return false;
  }

  const normalized = text.toLowerCase().trim();
  
  // Check for villainous keywords
  for (const keyword of VILLAINOUS_KEYWORDS) {
    // Use word boundaries to avoid false positives
    const regex = new RegExp(`\\b${keyword}\\b`, 'i');
    if (regex.test(normalized)) {
      return true;
    }
  }
  
  // Check for villainous phrases
  for (const phrase of VILLAINOUS_PHRASES) {
    if (normalized.includes(phrase)) {
      return true;
    }
  }
  
  return false;
}

/**
 * Checks if any of the provided texts contain villainous/negative language
 */
export function hasVillainousInput(...texts: string[]): boolean {
  return texts.some(text => isVillainousInput(text));
}
