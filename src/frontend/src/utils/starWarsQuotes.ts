interface StarWarsQuote {
  quote: string;
  attribution: string;
  universe: 'Star Wars';
}

// Curated Star Wars quotes for feedback and affirmation
export const starWarsQuotes: StarWarsQuote[] = [
  {
    quote: "Do or do not. There is no try.",
    attribution: "Yoda",
    universe: "Star Wars"
  },
  {
    quote: "In my experience, there's no such thing as luck.",
    attribution: "Obi-Wan Kenobi",
    universe: "Star Wars"
  },
  {
    quote: "The Force will be with you. Always.",
    attribution: "Obi-Wan Kenobi",
    universe: "Star Wars"
  },
  {
    quote: "Your focus determines your reality.",
    attribution: "Qui-Gon Jinn",
    universe: "Star Wars"
  },
  {
    quote: "Fear is the path to the dark side. Fear leads to anger, anger leads to hate, hate leads to suffering.",
    attribution: "Yoda",
    universe: "Star Wars"
  },
  {
    quote: "The greatest teacher, failure is.",
    attribution: "Yoda",
    universe: "Star Wars"
  },
  {
    quote: "Hope is like the sun. If you only believe in it when you can see it, you'll never make it through the night.",
    attribution: "Leia Organa",
    universe: "Star Wars"
  },
  {
    quote: "We are what they grow beyond. That is the true burden of all masters.",
    attribution: "Yoda",
    universe: "Star Wars"
  },
  {
    quote: "The belonging you seek is not behind you, it is ahead.",
    attribution: "Maz Kanata",
    universe: "Star Wars"
  },
  {
    quote: "Confronting fear is the destiny of a Jedi. Your destiny.",
    attribution: "Luke Skywalker",
    universe: "Star Wars"
  },
  {
    quote: "You must unlearn what you have learned.",
    attribution: "Yoda",
    universe: "Star Wars"
  },
  {
    quote: "In a dark place we find ourselves, and a little more knowledge lights our way.",
    attribution: "Yoda",
    universe: "Star Wars"
  },
  {
    quote: "The Force is not a power you have. It's not about lifting rocks. It's the energy between all things, a tension, a balance, that binds the universe together.",
    attribution: "Luke Skywalker",
    universe: "Star Wars"
  },
  {
    quote: "Never tell me the odds.",
    attribution: "Han Solo",
    universe: "Star Wars"
  },
  {
    quote: "I find your lack of faith disturbing.",
    attribution: "Darth Vader",
    universe: "Star Wars"
  },
  {
    quote: "Luminous beings are we, not this crude matter.",
    attribution: "Yoda",
    universe: "Star Wars"
  },
  {
    quote: "Someone has to save our skins!",
    attribution: "Leia Organa",
    universe: "Star Wars"
  },
  {
    quote: "The Force is strong with this one.",
    attribution: "Darth Vader",
    universe: "Star Wars"
  }
];

/**
 * Selects a Star Wars quote deterministically based on a seed value
 */
export function getStarWarsQuote(seed: number = 0): StarWarsQuote {
  const index = seed % starWarsQuotes.length;
  return starWarsQuotes[index];
}
