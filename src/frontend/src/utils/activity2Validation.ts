import { REFERENCES } from '../content/references';

interface Activity2Inputs {
  microSolution: string;
  protectiveFactor: string;
  villainResponse?: string;
  heroicResponse?: string;
  challengeType?: string;
  customChallenge?: string;
}

interface ValidationResult {
  citation: string;
  message: string;
}

/**
 * Selects a reference citation that aligns with the micro-solution themes.
 * Uses stable reference keys to ensure citations always correspond to entries on the References page.
 */
function selectAlignedCitation(inputs: Activity2Inputs): string {
  const { microSolution, protectiveFactor, heroicResponse } = inputs;

  // Combine relevant text for theme matching
  const combinedText = `${microSolution} ${protectiveFactor} ${heroicResponse || ''}`.toLowerCase();

  // Theme-based citation mapping using stable reference keys
  const citationThemes: Record<string, string[]> = {
    // Leadership and resilience
    leadership: ['erickson2017', 'jansen2024', 'northouse2022', 'ramamoorthi2023', 'sunderman2024'],
    resilience: ['erickson2017', 'masten2014', 'jansen2024', 'wang2025'],

    // Support and mentorship
    support: ['erickson2017', 'killingback2025', 'mcgrath2022', 'waddington2025'],
    mentorship: ['jansen2024', 'killingback2025', 'mcgrath2022', 'northouse2022'],
    collaboration: ['erickson2017', 'jansen2024', 'killingback2025', 'ramamoorthi2023'],

    // Compassion and inclusion
    compassion: ['killingback2025', 'mcgrath2022', 'waddington2025'],
    inclusion: ['erickson2017', 'killingback2025', 'mcgrath2022', 'ramamoorthi2023'],
    belonging: ['erickson2017', 'mcgrath2022', 'ramamoorthi2023'],

    // Ethical and moral
    ethical: ['anastasiou2025', 'bienkowska2025', 'ghamrawi2024', 'northouse2022'],
    integrity: ['anastasiou2025', 'bienkowska2025', 'ghamrawi2024', 'northouse2022'],

    // Development and growth
    development: ['erickson2017', 'jansen2024', 'masten2014', 'sunderman2024'],
    growth: ['erickson2017', 'jansen2024', 'masten2014', 'sunderman2024'],

    // Challenges and adversity
    challenge: ['erickson2017', 'elliott1996', 'jansen2024', 'masten2014', 'wang2025'],
    adversity: ['erickson2017', 'fazio2008', 'masten2014', 'northouse2022'],

    // Community and connection
    community: ['erickson2017', 'killingback2025', 'mcgrath2022', 'ramamoorthi2023'],
    connection: ['killingback2025', 'mcgrath2022', 'waddington2025'],
  };

  // Find matching themes
  const matchedKeys: string[] = [];
  for (const [theme, keys] of Object.entries(citationThemes)) {
    if (combinedText.includes(theme)) {
      matchedKeys.push(...keys);
    }
  }

  // If no matches, use a default set focused on resilience and leadership
  const finalKeys = matchedKeys.length > 0 ? matchedKeys : ['erickson2017', 'jansen2024', 'masten2014', 'northouse2022'];

  // Remove duplicates
  const uniqueKeys = Array.from(new Set(finalKeys));

  // Select one citation deterministically based on input hash
  const hash = microSolution.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const selectedKey = uniqueKeys[hash % uniqueKeys.length];

  // Find the reference by key
  const reference = REFERENCES.find((ref) => ref.key === selectedKey);

  // Return the reference text, or fallback to first reference if not found
  return reference ? reference.text : REFERENCES[0].text;
}

/**
 * Generates a validation result for Activity 2 micro-solution (citation and message only)
 */
export function generateActivity2Validation(inputs: Activity2Inputs): ValidationResult {
  // Select an aligned citation
  const citation = selectAlignedCitation(inputs);

  // Generate validation message
  const message = `Your micro-solution demonstrates the kind of heroic leadership that transforms challenges into opportunities for growth. By proposing "${inputs.microSolution.substring(0, 100)}${inputs.microSolution.length > 100 ? '...' : ''}", you're embodying the protective power of ${inputs.protectiveFactor.toLowerCase()} to create positive change in your academic community.`;

  return {
    citation,
    message,
  };
}
