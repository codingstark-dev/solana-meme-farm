import type { Wallet, MemeCoin, FarmingPool, Transaction } from "../types";

// Simulated Solana wallet functions
export function createMockWallet(): Wallet {
  const address = generateSolanaAddress();
  return {
    address,
    balance: parseFloat((Math.random() * 10 + 0.5).toFixed(4)),
    memeCoins: [],
    connected: true,
  };
}

function generateSolanaAddress(): string {
  const chars = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
  let address = "";
  for (let i = 0; i < 44; i++) {
    address += chars[Math.floor(Math.random() * chars.length)];
  }
  return address;
}

export function formatAddress(address: string): string {
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
}

export function createMemeCoin(symbol: string, name: string, memeId: string): MemeCoin {
  return {
    symbol,
    name,
    balance: 0,
    mintAddress: generateSolanaAddress(),
    price: parseFloat((Math.random() * 0.001).toFixed(8)),
    memeId,
  };
}

// Simulated transaction creation
export function createTransaction(
  type: Transaction["type"],
  amount: number,
  symbol: string
): Transaction {
  return {
    id: crypto.randomUUID(),
    type,
    amount,
    symbol,
    timestamp: Date.now(),
    status: "pending",
    signature: generateTransactionSignature(),
  };
}

function generateTransactionSignature(): string {
  const chars = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
  let sig = "";
  for (let i = 0; i < 88; i++) {
    sig += chars[Math.floor(Math.random() * chars.length)];
  }
  return sig;
}

// Simulated farming APR calculation
export function calculateAPR(pool: FarmingPool): number {
  const baseAPR = 50;
  const bonusFromStake = Math.log10(pool.totalStaked + 1) * 10;
  return Math.max(10, baseAPR + bonusFromStake + Math.random() * 20);
}

// Format SOL amount
export function formatSOL(amount: number): string {
  return `${amount.toFixed(4)} SOL`;
}

// Format token amount
export function formatTokenAmount(amount: number): string {
  if (amount >= 1_000_000_000) {
    return `${(amount / 1_000_000_000).toFixed(2)}B`;
  }
  if (amount >= 1_000_000) {
    return `${(amount / 1_000_000).toFixed(2)}M`;
  }
  if (amount >= 1_000) {
    return `${(amount / 1_000).toFixed(2)}K`;
  }
  return amount.toFixed(2);
}

// Calculate mining rewards
export function calculateMiningReward(hashRate: number, rarity: string): number {
  const baseReward = 100;
  const rarityMultiplier = {
    common: 1,
    rare: 2,
    epic: 5,
    legendary: 20,
  }[rarity] || 1;
  
  return baseReward * (hashRate / 100) * rarityMultiplier;
}
