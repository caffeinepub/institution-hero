import { QuoteGenre } from '../backend';

/**
 * Maps backend QuoteGenre enum to user-facing English franchise labels
 */
export function formatQuoteGenre(genre: QuoteGenre): string {
  switch (genre) {
    case QuoteGenre.starWars:
      return 'Star Wars';
    case QuoteGenre.avengers:
      return 'Avengers';
    case QuoteGenre.batman:
      return 'Batman';
    case QuoteGenre.harryPotter:
      return 'Harry Potter';
    default:
      return 'Unknown';
  }
}
