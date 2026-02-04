import { proposalContent } from '../content/proposalContent';

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
 * Selects a reference citation that aligns with the micro-solution themes
 */
function selectAlignedCitation(inputs: Activity2Inputs): string {
  const { microSolution, protectiveFactor, heroicResponse } = inputs;
  
  // Combine relevant text for theme matching
  const combinedText = `${microSolution} ${protectiveFactor} ${heroicResponse || ''}`.toLowerCase();
  
  // Theme-based citation mapping
  const citationThemes: Record<string, number[]> = {
    // Leadership and resilience
    leadership: [2, 5, 7, 9, 13, 15],
    resilience: [2, 3, 7, 9, 13],
    
    // Support and mentorship
    support: [3, 8, 10, 16],
    mentorship: [7, 8, 10, 13],
    collaboration: [3, 7, 8, 14],
    
    // Compassion and inclusion
    compassion: [8, 10, 16],
    inclusion: [3, 8, 10, 14],
    belonging: [3, 10, 14],
    
    // Ethical and moral
    ethical: [0, 1, 6, 13],
    integrity: [0, 1, 6, 13],
    
    // Development and growth
    development: [2, 3, 7, 9, 15],
    growth: [3, 7, 9, 15],
    
    // Challenges and adversity
    challenge: [2, 3, 5, 7, 9],
    adversity: [2, 5, 9, 13],
    
    // Community and connection
    community: [3, 8, 10, 14],
    connection: [8, 10, 16],
  };
  
  // Find matching themes
  const matchedIndices: number[] = [];
  for (const [theme, indices] of Object.entries(citationThemes)) {
    if (combinedText.includes(theme)) {
      matchedIndices.push(...indices);
    }
  }
  
  // If no matches, use a default set focused on resilience and leadership
  const finalIndices = matchedIndices.length > 0 ? matchedIndices : [2, 7, 9, 13];
  
  // Select one citation deterministically based on input hash
  const hash = microSolution.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const selectedIndex = finalIndices[hash % finalIndices.length];
  
  return proposalContent.references[selectedIndex];
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
    message
  };
}
