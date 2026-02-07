import { REFERENCES, ReferenceEntry } from '../content/references';

/**
 * Validates that a reference entry contains valid DOI and URL formats
 */
function isValidReference(reference: ReferenceEntry): boolean {
  const text = reference.text;
  
  // Check for DOI format - must use https://doi.org/ if DOI is present
  const doiMatch = text.match(/doi\.org/i);
  if (doiMatch) {
    // Ensure it uses https://doi.org/ format
    if (!text.includes('https://doi.org/')) {
      return false;
    }
  }
  
  // Check for URLs - must start with https://
  const urlMatch = text.match(/https?:\/\//i);
  if (urlMatch) {
    // Ensure all URLs use https://
    if (text.includes('http://') && !text.includes('https://')) {
      return false;
    }
  }
  
  return true;
}

/**
 * Selects a valid reference from a list of candidate keys.
 * Falls back to another valid reference if candidates are invalid or missing.
 */
export function selectValidReference(candidateKeys?: string[]): ReferenceEntry {
  // If candidate keys provided, try to find a valid one
  if (candidateKeys && candidateKeys.length > 0) {
    for (const key of candidateKeys) {
      const reference = REFERENCES.find((r) => r.key === key);
      if (reference && isValidReference(reference)) {
        return reference;
      }
    }
  }
  
  // Fallback: find any valid reference from the full list
  const validReferences = REFERENCES.filter(isValidReference);
  
  if (validReferences.length === 0) {
    // Ultimate fallback: return first reference (should never happen with current data)
    return REFERENCES[0];
  }
  
  // Return a random valid reference
  const randomIndex = Math.floor(Math.random() * validReferences.length);
  return validReferences[randomIndex];
}

/**
 * Selects a valid reference deterministically based on input text hash
 */
export function selectValidReferenceByHash(inputText: string, candidateKeys?: string[]): ReferenceEntry {
  // Create a simple hash from the input text
  const hash = inputText.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  // If candidate keys provided, try to find a valid one deterministically
  if (candidateKeys && candidateKeys.length > 0) {
    const validCandidates = candidateKeys
      .map((key) => REFERENCES.find((r) => r.key === key))
      .filter((ref): ref is ReferenceEntry => ref !== undefined && isValidReference(ref));
    
    if (validCandidates.length > 0) {
      return validCandidates[hash % validCandidates.length];
    }
  }
  
  // Fallback: select from all valid references
  const validReferences = REFERENCES.filter(isValidReference);
  
  if (validReferences.length === 0) {
    return REFERENCES[0];
  }
  
  return validReferences[hash % validReferences.length];
}

/**
 * Gets all valid references that exist in REFERENCES
 */
export function getValidReferences(): ReferenceEntry[] {
  return REFERENCES.filter(isValidReference);
}
