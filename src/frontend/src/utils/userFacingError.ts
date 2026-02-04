/**
 * Converts unknown error values into user-facing English messages.
 * Handles actor initialization errors, backend traps, and generic failures.
 */
export function toUserFacingError(error: unknown): string {
  if (typeof error === 'string') {
    // Handle string errors directly
    if (error.includes('Actor not initialized')) {
      return 'Connection is still initializing. Please wait a moment and try again.';
    }
    if (error.includes('Please select at least a core Leadership Challenge')) {
      return 'Please select a challenge from the list or describe your own challenge.';
    }
    if (error.includes('Please provide at least a core Leadership Challenge')) {
      return 'Please provide a challenge description.';
    }
    return error;
  }

  if (error instanceof Error) {
    const message = error.message;
    
    // Actor not ready
    if (message.includes('Actor not initialized')) {
      return 'Connection is still initializing. Please wait a moment and try again.';
    }
    
    // Backend validation errors
    if (message.includes('Please select at least a core Leadership Challenge')) {
      return 'Please select a challenge from the list or describe your own challenge.';
    }
    
    if (message.includes('Please provide at least a core Leadership Challenge')) {
      return 'Please provide a challenge description.';
    }
    
    // Network/connection errors
    if (message.includes('fetch') || message.includes('network')) {
      return 'Network error. Please check your connection and try again.';
    }
    
    // Generic backend errors
    if (message.includes('reject') || message.includes('trap')) {
      return 'The server encountered an error. Please try again.';
    }
    
    // Quote fetch errors
    if (message.includes('quote')) {
      return 'Unable to fetch quote. Please try again.';
    }
    
    return message;
  }

  // Fallback for unknown error types
  return 'An unexpected error occurred. Please try again.';
}
