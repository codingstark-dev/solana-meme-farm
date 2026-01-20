import { useState, useEffect, useCallback, useRef } from "react";
import type { Meme, MiningState, Transaction } from "../types";
import { generateMeme, RARITY_COLORS } from "../utils/memeGenerator";
import { createTransaction, calculateMiningReward } from "../utils/solana";

export function useMining(onMemeFound: (meme: Meme, reward: number) => void) {
  const [state, setState] = useState<MiningState>({
    isActive: false,
    progress: 0,
    hashRate: 0,
    currentMeme: null,
    memesPending: 0,
  });

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const generation = useRef(1);

  const startMining = useCallback(() => {
    if (state.isActive) return;

    setState(s => ({
      ...s,
      isActive: true,
      progress: 0,
      hashRate: 50 + Math.floor(Math.random() * 50),
    }));
  }, [state.isActive]);

  const stopMining = useCallback(() => {
    setState(s => ({
      ...s,
      isActive: false,
      progress: 0,
    }));
  }, []);

  useEffect(() => {
    if (!state.isActive) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      setState(prev => {
        const newProgress = prev.progress + Math.random() * 8 + 2;
        
        if (newProgress >= 100) {
          const newMeme = generateMeme(generation.current);
          generation.current++;
          const reward = calculateMiningReward(prev.hashRate, newMeme.rarity);
          
          // Schedule callback outside of setState
          setTimeout(() => onMemeFound(newMeme, reward), 0);
          
          return {
            ...prev,
            progress: 0,
            currentMeme: newMeme,
            memesPending: prev.memesPending + 1,
            hashRate: 50 + Math.floor(Math.random() * 50),
          };
        }

        return {
          ...prev,
          progress: newProgress,
          hashRate: prev.hashRate + (Math.random() - 0.5) * 5,
        };
      });
    }, 200);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [state.isActive, onMemeFound]);

  return { state, startMining, stopMining };
}

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const addTransaction = useCallback((tx: Transaction) => {
    setTransactions(prev => [tx, ...prev].slice(0, 50)); // Keep last 50

    // Simulate confirmation
    setTimeout(() => {
      setTransactions(prev =>
        prev.map(t =>
          t.id === tx.id
            ? { ...t, status: Math.random() > 0.1 ? "confirmed" : "failed" }
            : t
        ) as Transaction[]
      );
    }, 2000 + Math.random() * 3000);
  }, []);

  return { transactions, addTransaction };
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<
    Array<{ id: string; message: string; type: string; timestamp: number }>
  >([]);

  const addNotification = useCallback(
    (message: string, type: "success" | "error" | "info" | "warning" = "info") => {
      const id = crypto.randomUUID();
      setNotifications(prev => [...prev, { id, message, type, timestamp: Date.now() }]);

      // Auto-remove after 5 seconds
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== id));
      }, 5000);
    },
    []
  );

  return { notifications, addNotification };
}
