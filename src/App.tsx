import React, { useState, useCallback } from "react";
import { useKeyboard, useRenderer } from "@opentui/react";

import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { MiningView } from "./components/MiningView";
import { FarmingView } from "./components/FarmingView";
import { VotingView } from "./components/VotingView";
import { GalleryView } from "./components/GalleryView";
import { WalletView } from "./components/WalletView";
import { HelpModal } from "./components/HelpModal";

import { useMining, useTransactions, useNotifications } from "./hooks/useMining";
import { createMockWallet, createMemeCoin, createTransaction } from "./utils/solana";
import { mutateMeme } from "./utils/memeGenerator";

import type { ViewType, Meme, MemeCoin, FarmingPool, VotingRound, Wallet } from "./types";

export function App() {
  const renderer = useRenderer();

  // App state
  const [currentView, setCurrentView] = useState<ViewType>("mine");
  const [showHelp, setShowHelp] = useState(false);
  const [wallet, setWallet] = useState<Wallet>(() => createMockWallet());
  const [memes, setMemes] = useState<Meme[]>([]);
  const [memeCoins, setMemeCoins] = useState<MemeCoin[]>([]);
  const [farmingPools, setFarmingPools] = useState<FarmingPool[]>([]);
  const [votingRounds, setVotingRounds] = useState<VotingRound[]>([]);
  const [minedTokens, setMinedTokens] = useState(0);
  const [totalVotes, setTotalVotes] = useState(0);

  const { transactions, addTransaction } = useTransactions();
  const { notifications, addNotification } = useNotifications();

  // Handle meme found from mining
  const handleMemeFound = useCallback((meme: Meme, reward: number) => {
    setMemes((prev) => [meme, ...prev]);
    setMinedTokens((prev) => prev + reward);

    // Create a new meme coin for this meme
    const newCoin = createMemeCoin(meme.tokenSymbol, meme.name, meme.id);
    newCoin.balance = reward;
    setMemeCoins((prev) => [...prev, newCoin]);

    // Create a farming pool for this meme
    const newPool: FarmingPool = {
      id: meme.id,
      memeId: meme.id,
      memeName: meme.name,
      stakedAmount: 0,
      rewardRate: Math.random() * 10 + 1,
      totalStaked: Math.floor(Math.random() * 10000),
      apr: 50 + Math.random() * 100,
    };
    setFarmingPools((prev) => [...prev, newPool]);

    // Add transaction
    addTransaction(createTransaction("mine", reward, meme.tokenSymbol));
    addNotification(`Mined ${meme.rarity} meme: ${meme.name}!`, "success");
  }, [addTransaction, addNotification]);

  const { state: miningState, startMining, stopMining } = useMining(handleMemeFound);

  // Farming handlers
  const handleStake = useCallback((poolId: string, amount: number) => {
    setFarmingPools((prev) =>
      prev.map((p) =>
        p.id === poolId
          ? { ...p, stakedAmount: p.stakedAmount + amount, totalStaked: p.totalStaked + amount }
          : p
      )
    );
    addTransaction(createTransaction("stake", amount, "MEME"));
    addNotification(`Staked ${amount} tokens`, "success");
  }, [addTransaction, addNotification]);

  const handleUnstake = useCallback((poolId: string, amount: number) => {
    setFarmingPools((prev) =>
      prev.map((p) =>
        p.id === poolId
          ? {
              ...p,
              stakedAmount: Math.max(0, p.stakedAmount - amount),
              totalStaked: Math.max(0, p.totalStaked - amount),
            }
          : p
      )
    );
    addTransaction(createTransaction("unstake", amount, "MEME"));
    addNotification(`Unstaked ${amount} tokens`, "info");
  }, [addTransaction, addNotification]);

  const handleClaim = useCallback((poolId: string) => {
    const pool = farmingPools.find((p) => p.id === poolId);
    if (pool && pool.stakedAmount > 0) {
      const reward = pool.stakedAmount * (pool.rewardRate / 100);
      setMemeCoins((prev) =>
        prev.map((c) =>
          c.memeId === pool.memeId ? { ...c, balance: c.balance + reward } : c
        )
      );
      addTransaction(createTransaction("mint", reward, "MEME"));
      addNotification(`Claimed ${reward.toFixed(2)} tokens!`, "success");
    }
  }, [farmingPools, addTransaction, addNotification]);

  // Voting handlers
  const handleVote = useCallback((memeId: string, voteType: "evolve" | "mutate" | "merge") => {
    const meme = memes.find((m) => m.id === memeId);
    if (!meme) return;

    setTotalVotes((prev) => prev + 1);
    setMemes((prev) =>
      prev.map((m) => (m.id === memeId ? { ...m, votes: m.votes + 1 } : m))
    );

    if (voteType === "mutate") {
      const mutated = mutateMeme(meme);
      setMemes((prev) => [mutated, ...prev]);
      addNotification(`Mutated ${meme.name} into ${mutated.name}!`, "success");
    }

    addTransaction(createTransaction("vote", 1, "VOTE"));
    addNotification(`Voted to ${voteType} ${meme.name}`, "info");
  }, [memes, addTransaction, addNotification]);

  const handleCreateRound = useCallback((memeId: string) => {
    const newRound: VotingRound = {
      id: crypto.randomUUID(),
      memeId,
      proposedChanges: ["Evolution", "Mutation", "Merge"],
      votesFor: 0,
      votesAgainst: 0,
      endTime: Date.now() + 3600000,
      status: "active",
    };
    setVotingRounds((prev) => [...prev, newRound]);
    addNotification("Created new voting round!", "success");
  }, [addNotification]);

  // Wallet handlers
  const handleConnect = useCallback(() => {
    setWallet((prev) => ({ ...prev, connected: true }));
    addNotification("Wallet connected!", "success");
  }, [addNotification]);

  const handleDisconnect = useCallback(() => {
    setWallet((prev) => ({ ...prev, connected: false }));
    addNotification("Wallet disconnected", "info");
  }, [addNotification]);

  // Keyboard navigation
  useKeyboard((key) => {
    // Help toggle
    if (key.name === "?" || (key.shift && key.name === "/")) {
      setShowHelp((prev) => !prev);
      return;
    }

    // Close help with Escape
    if (key.name === "escape") {
      if (showHelp) {
        setShowHelp(false);
        return;
      }
      renderer.destroy();
      return;
    }

    // View switching with number keys
    const viewMap: Record<string, ViewType> = {
      "1": "mine",
      "2": "farm",
      "3": "vote",
      "4": "gallery",
      "5": "wallet",
    };
    if (viewMap[key.name]) {
      setCurrentView(viewMap[key.name]!);
      return;
    }

    // Mining shortcuts
    if (currentView === "mine") {
      if (key.name === "s" && !miningState.isActive) {
        startMining();
      } else if (key.name === "x" && miningState.isActive) {
        stopMining();
      }
    }
  });

  // Calculate stats
  const stats = {
    totalMined: memes.length,
    totalStaked: farmingPools.reduce((acc, p) => acc + p.stakedAmount, 0),
    totalVotes,
  };

  // Render current view
  const renderView = () => {
    switch (currentView) {
      case "mine":
        return (
          <MiningView
            state={miningState}
            onStartMining={startMining}
            onStopMining={stopMining}
            recentMemes={memes}
            minedTokens={minedTokens}
          />
        );
      case "farm":
        return (
          <FarmingView
            pools={farmingPools}
            memeCoins={memeCoins}
            onStake={handleStake}
            onUnstake={handleUnstake}
            onClaim={handleClaim}
          />
        );
      case "vote":
        return (
          <VotingView
            memes={memes}
            votingRounds={votingRounds}
            onVote={handleVote}
            onCreateRound={handleCreateRound}
          />
        );
      case "gallery":
        return (
          <GalleryView
            memes={memes}
            onSelectMeme={(meme) => {
              setCurrentView("vote");
            }}
          />
        );
      case "wallet":
        return (
          <WalletView
            wallet={wallet}
            memeCoins={memeCoins}
            transactions={transactions}
            onConnect={handleConnect}
            onDisconnect={handleDisconnect}
          />
        );
      default:
        return null;
    }
  };

  return (
    <box flexDirection="column" width="100%" height="100%" backgroundColor="#0a0a1e">
      {/* Header */}
      <Header
        balance={wallet.balance}
        walletAddress={wallet.address}
        notifications={notifications.length}
      />

      {/* Main Content */}
      <box flexDirection="row" flexGrow={1}>
        {/* Sidebar */}
        <Sidebar currentView={currentView} onViewChange={setCurrentView} stats={stats} />

        {/* Main View */}
        <box flexDirection="column" flexGrow={1} backgroundColor="#0a0a1e">
          {renderView()}
        </box>
      </box>

      {/* Help Modal */}
      {showHelp && <HelpModal onClose={() => setShowHelp(false)} />}

      {/* Notifications */}
      {notifications.length > 0 && (
        <box
          position="absolute"
          right={2}
          top={4}
          flexDirection="column"
          gap={1}
          zIndex={50}
        >
          {notifications.slice(0, 3).map((n) => (
            <box
              key={n.id}
              border
              borderStyle="rounded"
              borderColor={
                n.type === "success"
                  ? "#00ff88"
                  : n.type === "error"
                  ? "#ff4444"
                  : n.type === "warning"
                  ? "#ffaa00"
                  : "#7aa2f7"
              }
              padding={1}
              paddingLeft={2}
              paddingRight={2}
              backgroundColor="#1a1a2e"
            >
              <text>
                <span
                  fg={
                    n.type === "success"
                      ? "#00ff88"
                      : n.type === "error"
                      ? "#ff4444"
                      : n.type === "warning"
                      ? "#ffaa00"
                      : "#7aa2f7"
                  }
                >
                  {n.message}
                </span>
              </text>
            </box>
          ))}
        </box>
      )}
    </box>
  );
}
