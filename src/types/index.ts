// Meme types
export interface Meme {
  id: string;
  name: string;
  ascii: string[];
  rarity: "common" | "rare" | "epic" | "legendary";
  votes: number;
  creator: string;
  generation: number;
  traits: string[];
  tokenSymbol: string;
  mintAddress?: string;
}

// Wallet types
export interface Wallet {
  address: string;
  balance: number; // SOL balance
  memeCoins: MemeCoin[];
  connected: boolean;
}

export interface MemeCoin {
  symbol: string;
  name: string;
  balance: number;
  mintAddress: string;
  price: number;
  memeId: string;
}

// Mining types
export interface MiningState {
  isActive: boolean;
  progress: number;
  hashRate: number;
  currentMeme: Meme | null;
  memesPending: number;
}

// Farming types
export interface FarmingPool {
  id: string;
  memeId: string;
  memeName: string;
  stakedAmount: number;
  rewardRate: number;
  totalStaked: number;
  apr: number;
}

// Voting types
export interface Vote {
  memeId: string;
  voter: string;
  timestamp: number;
  voteType: "evolve" | "mutate" | "merge";
}

export interface VotingRound {
  id: string;
  memeId: string;
  proposedChanges: string[];
  votesFor: number;
  votesAgainst: number;
  endTime: number;
  status: "active" | "passed" | "failed";
}

// Transaction types
export interface Transaction {
  id: string;
  type: "mine" | "stake" | "unstake" | "vote" | "mint" | "transfer";
  amount: number;
  symbol: string;
  timestamp: number;
  status: "pending" | "confirmed" | "failed";
  signature?: string;
}

// App state
export interface AppState {
  wallet: Wallet | null;
  memes: Meme[];
  mining: MiningState;
  farmingPools: FarmingPool[];
  votingRounds: VotingRound[];
  transactions: Transaction[];
  currentView: "farm" | "mine" | "vote" | "wallet" | "gallery";
  notifications: Notification[];
}

export interface Notification {
  id: string;
  message: string;
  type: "success" | "error" | "info" | "warning";
  timestamp: number;
}

// View options
export type ViewType = "farm" | "mine" | "vote" | "wallet" | "gallery";
