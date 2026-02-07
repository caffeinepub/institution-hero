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
    case QuoteGenre.darkKnightTrilogy:
      return 'The Dark Knight Trilogy';
    case QuoteGenre.infinite:
      return 'Infinite';
    case QuoteGenre.kingsman:
      return 'Kingsman';
    case QuoteGenre.threeKings:
      return 'Three Kings';
    case QuoteGenre.transformers:
      return 'Transformers';
    case QuoteGenre.warDogs:
      return 'War Dogs';
    default:
      return 'Unknown';
  }
}
