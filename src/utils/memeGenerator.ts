import type { Meme } from "../types";

// ASCII art templates for different meme categories
export const MEME_TEMPLATES: Record<string, string[]> = {
  doge: [
    "     ▄              ▄     ",
    "    ▌▒█           ▄▀▒▌    ",
    "    ▌▒▒█        ▄▀▒▒▒▐    ",
    "   ▐▄▀▒▒▀▀▀▀▄▄▄▀▒▒▒▒▒▐    ",
    " ▄▄▀▒░▒▒▒▒▒▒▒▒▒█▒▒▄█▒▐    ",
    "▐▒▒▒▄▄▒▒▒▒░░░▒▒▒▀██▀▒▌    ",
    "▌▒▒▒░▄▀▒▒▒▒▒▒▒░░░░░░▒▒▌   ",
    "▌░▒▒░█▀▒▒▒▒▒▄▀█▄▒▒░░░░▐   ",
    "▐▒▒░░▀▄▀▄▄▄▄▀  ▀▀▄▒░░░▐   ",
    "▐▒▒░░▒▀▐   ▄▄▄▄▀░▒░░░░▌   ",
    "▐▒▒▒▒▒▌   ▐▒▒▒▀▒░░░░░░▐   ",
    " ▀▄▒▒▒▒▒▒   WOW  ░░░▄▀    ",
    "   ▀▄▄▒▒▒▒░░░░░░░░▄▄▀     ",
  ],
  pepe: [
    "   ░░░░▄▄▄▄▀▀▀▀▀▀▀▀▄▄▄▄░░░    ",
    "   ░░▄▀░░░░░░░░░░░░░░░░▀▄░░   ",
    "   ░▄▀░░░░░░░░░░░░░░░░░░▀▄░   ",
    "   ▐░░░░░░░▄▄▄▄▄▄▄░░░░░░░▐░   ",
    "   ░▀▄▄▄█░░░▐▀░▀▐░░█▄▄▄▀░░░   ",
    "   ░░░▐░░░░░▐   ▐░░░░░▐░░░░   ",
    "   ░░░▐░░░░░▐▄▄▄▐░░░░░▐░░░░   ",
    "   ░░░░▀▄░░░░░░░░░░░░▄▀░░░░   ",
    "   ░░░░░░▀▄▄▄░░▄▄▄▀▀░░░░░░░   ",
  ],
  wojak: [
    "      ▄████████▄       ",
    "    ▄█░░░░░░░░░▀█▄     ",
    "   █░░░░░░░░░░░░░█     ",
    "  █░░░░░░░░░░░░░░░█    ",
    " █░░░▄▀▀▀▀▄░▄▀▀▀▄░█    ",
    " █░░█░░●░░░█░●░░░█░█   ",
    " █░░▀▄▄▄▄▄▀░▀▄▄▄▀░░█   ",
    "  █░░░░░░░░░░░░░░░█    ",
    "   █░░▀▀▀▀▀▀▀▀▀░░█     ",
    "    ▀█▄▄▄▄▄▄▄▄▄▄█▀     ",
  ],
  moon: [
    "          ████          ",
    "       ▄██▀▀▀▀██▄       ",
    "     ▄█▀        ▀█▄     ",
    "    █▀   ◉    ◉   ▀█    ",
    "   █                █   ",
    "   █    TO THE MOON  █  ",
    "   █        ▼        █  ",
    "    █▄            ▄█    ",
    "     ▀█▄        ▄█▀     ",
    "       ▀██▄▄▄▄██▀       ",
    "          ████          ",
  ],
  rocket: [
    "        ▲        ",
    "       ▐█▌       ",
    "      ▐███▌      ",
    "     ▐█████▌     ",
    "    ▐███████▌    ",
    "   ▐█████████▌   ",
    "  ▐███▀███▀███▌  ",
    " ▐██▀ ▐███▌ ▀██▌ ",
    " ▐█   ▐███▌   █▌ ",
    "      ▐▀▀▀▌      ",
    "     ▐▌▄▄▄▐▌     ",
    "    ▐▌ ░░░ ▐▌    ",
    "       ▀▀▀       ",
  ],
  diamond: [
    "       ▄▄▄▄▄▄▄       ",
    "    ▄████████████▄    ",
    "  ▄████▀▀▀▀▀▀████▄    ",
    " ████▀  HODL  ▀████   ",
    "████▀▀▀▀▀▀▀▀▀▀▀▀████  ",
    " ▀██████████████████▀ ",
    "   ▀████████████▀     ",
    "     ▀████████▀       ",
    "       ▀████▀         ",
    "         ▀▀           ",
  ],
  cat: [
    "   /\\___/\\   ",
    "  (  o o  )  ",
    "  (  =^=  )  ",
    "   (---)   ",
    "  /|     |\\  ",
    " (_|     |_) ",
  ],
  ape: [
    "     ████████       ",
    "   ██▓▓▓▓▓▓▓▓██     ",
    "  █▓▓▓▓▓▓▓▓▓▓▓▓█    ",
    " █▓▓▓█▀▓▓▀█▓▓▓▓▓█   ",
    " █▓▓▓▓▓▓▓▓▓▓▓▓▓▓█   ",
    "  █▓▓▓▀▄▄▄▀▓▓▓▓█    ",
    "   █▓▓▓▓▓▓▓▓▓▓█     ",
    "    ██▓▓▓▓▓▓██      ",
    "      ██████        ",
  ],
};

const MEME_NAMES = [
  "SolanaDoge", "MemePepe", "WojakSOL", "DiamondHands", "RocketMoon",
  "CatCoin", "ApeStrong", "LunarLambo", "CryptoChad", "SOLWojak",
  "DogeMoon", "PepeRocket", "MoonCat", "DiamondApe", "WojakDoge",
  "RocketPepe", "SolCat", "MemeApe", "HodlDoge", "ChainPepe"
];

const TRAITS = [
  "laser-eyes", "diamond-hands", "moon-bound", "ape-strong", "hodl-mode",
  "degen", "whale", "paper-hands", "based", "ngmi", "wagmi", "fud-proof",
  "bullish", "memetic", "viral", "rare-pepe", "ancient", "cursed", "blessed"
];

function randomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]!;
}

function generateTokenSymbol(name: string): string {
  const prefix = name.slice(0, 3).toUpperCase();
  const suffix = Math.floor(Math.random() * 1000);
  return `$${prefix}${suffix}`;
}

function getRandomTraits(count: number): string[] {
  const shuffled = [...TRAITS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

function getRarity(): Meme["rarity"] {
  const roll = Math.random();
  if (roll < 0.6) return "common";
  if (roll < 0.85) return "rare";
  if (roll < 0.97) return "epic";
  return "legendary";
}

export function generateMeme(generation: number = 1): Meme {
  const templates = Object.entries(MEME_TEMPLATES);
  const [templateKey, ascii] = randomElement(templates);
  const name = randomElement(MEME_NAMES);
  const rarity = getRarity();
  const traitCount = rarity === "legendary" ? 5 : rarity === "epic" ? 4 : rarity === "rare" ? 3 : 2;

  return {
    id: crypto.randomUUID(),
    name: `${name}_G${generation}`,
    ascii: [...ascii],
    rarity,
    votes: Math.floor(Math.random() * 100),
    creator: `${Math.random().toString(36).slice(2, 8)}...${Math.random().toString(36).slice(2, 6)}`,
    generation,
    traits: getRandomTraits(traitCount),
    tokenSymbol: generateTokenSymbol(name),
  };
}

export function mutateMeme(meme: Meme): Meme {
  const newAscii = meme.ascii.map(line => {
    // Randomly mutate some characters
    return line.split('').map(char => {
      if (Math.random() < 0.05 && char !== ' ') {
        const mutants = ['*', '#', '@', '%', '&', '!', '?', '+'];
        return randomElement(mutants);
      }
      return char;
    }).join('');
  });

  return {
    ...meme,
    id: crypto.randomUUID(),
    name: `${meme.name}_M`,
    ascii: newAscii,
    generation: meme.generation + 1,
    traits: [...meme.traits.slice(0, -1), randomElement(TRAITS)],
    votes: 0,
  };
}

export function mergeMemes(meme1: Meme, meme2: Meme): Meme {
  // Take top half from meme1, bottom half from meme2
  const halfPoint = Math.floor(meme1.ascii.length / 2);
  const mergedAscii = [
    ...meme1.ascii.slice(0, halfPoint),
    ...meme2.ascii.slice(halfPoint),
  ];

  const combinedTraits = [...new Set([...meme1.traits, ...meme2.traits])].slice(0, 5);

  return {
    id: crypto.randomUUID(),
    name: `${meme1.name.split('_')[0]}${meme2.name.split('_')[0]}_G${Math.max(meme1.generation, meme2.generation) + 1}`,
    ascii: mergedAscii,
    rarity: meme1.rarity === "legendary" || meme2.rarity === "legendary" ? "legendary" : "epic",
    votes: 0,
    creator: meme1.creator,
    generation: Math.max(meme1.generation, meme2.generation) + 1,
    traits: combinedTraits,
    tokenSymbol: generateTokenSymbol(`${meme1.name}${meme2.name}`),
  };
}

export const RARITY_COLORS: Record<Meme["rarity"], string> = {
  common: "#AAAAAA",
  rare: "#5555FF",
  epic: "#AA00AA",
  legendary: "#FFAA00",
};
