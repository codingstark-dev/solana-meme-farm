import React, { useState } from "react";
import type { FarmingPool, MemeCoin } from "../types";

interface FarmingViewProps {
  pools: FarmingPool[];
  memeCoins: MemeCoin[];
  onStake: (poolId: string, amount: number) => void;
  onUnstake: (poolId: string, amount: number) => void;
  onClaim: (poolId: string) => void;
}

export function FarmingView({
  pools,
  memeCoins,
  onStake,
  onUnstake,
  onClaim,
}: FarmingViewProps) {
  const [selectedPool, setSelectedPool] = useState<string | null>(null);
  const [stakeAmount, setStakeAmount] = useState("");

  return (
    <box flexDirection="column" padding={2} gap={2} flexGrow={1}>
      {/* Title */}
      <ascii-font text="MEME FARM" font="tiny" color="#7aa2f7" />

      {/* Stats Overview */}
      <box flexDirection="row" gap={3}>
        <box
          border
          borderStyle="rounded"
          borderColor="#3a3a5e"
          padding={1}
          paddingLeft={2}
          paddingRight={2}
          backgroundColor="#1a1a2e"
        >
          <text>
            <span fg="#888888">Total Pools: </span>
            <span fg="#7aa2f7">
              <strong>{pools.length}</strong>
            </span>
          </text>
        </box>
        <box
          border
          borderStyle="rounded"
          borderColor="#3a3a5e"
          padding={1}
          paddingLeft={2}
          paddingRight={2}
          backgroundColor="#1a1a2e"
        >
          <text>
            <span fg="#888888">Your Tokens: </span>
            <span fg="#00ff88">
              <strong>{memeCoins.length}</strong>
            </span>
          </text>
        </box>
        <box
          border
          borderStyle="rounded"
          borderColor="#3a3a5e"
          padding={1}
          paddingLeft={2}
          paddingRight={2}
          backgroundColor="#1a1a2e"
        >
          <text>
            <span fg="#888888">Total Staked: </span>
            <span fg="#ffaa00">
              <strong>
                {pools.reduce((acc, p) => acc + p.stakedAmount, 0).toLocaleString()}
              </strong>
            </span>
          </text>
        </box>
      </box>

      {/* Farming Pools */}
      <box
        border
        borderStyle="single"
        borderColor="#3a3a5e"
        padding={1}
        backgroundColor="#1a1a2e"
        flexDirection="column"
        flexGrow={1}
      >
        <text>
          <span fg="#7aa2f7">
            <strong>[ FARMING POOLS ]</strong>
          </span>
        </text>

        {/* Pool List Header */}
        <box flexDirection="row" gap={2} marginTop={1} paddingBottom={1}>
          <box width={20}>
            <text>
              <span fg="#666666">Pool</span>
            </text>
          </box>
          <box width={15}>
            <text>
              <span fg="#666666">APR</span>
            </text>
          </box>
          <box width={15}>
            <text>
              <span fg="#666666">Your Stake</span>
            </text>
          </box>
          <box width={15}>
            <text>
              <span fg="#666666">Total Staked</span>
            </text>
          </box>
          <box width={15}>
            <text>
              <span fg="#666666">Rewards/hr</span>
            </text>
          </box>
        </box>

        <scrollbox height={12} focused>
          {pools.length === 0 ? (
            <text>
              <span fg="#666666">
                No pools available. Mine some memes first!
              </span>
            </text>
          ) : (
            pools.map((pool) => (
              <box
                key={pool.id}
                flexDirection="row"
                gap={2}
                paddingTop={1}
                paddingBottom={1}
                backgroundColor={
                  selectedPool === pool.id ? "#2a2a4e" : "transparent"
                }
                onMouseDown={() => setSelectedPool(pool.id)}
              >
                <box width={20}>
                  <text>
                    <span fg="#ffffff">{pool.memeName}</span>
                  </text>
                </box>
                <box width={15}>
                  <text>
                    <span fg="#00ff88">
                      <strong>{pool.apr.toFixed(1)}%</strong>
                    </span>
                  </text>
                </box>
                <box width={15}>
                  <text>
                    <span fg="#7aa2f7">
                      {pool.stakedAmount.toLocaleString()}
                    </span>
                  </text>
                </box>
                <box width={15}>
                  <text>
                    <span fg="#888888">
                      {pool.totalStaked.toLocaleString()}
                    </span>
                  </text>
                </box>
                <box width={15}>
                  <text>
                    <span fg="#ffaa00">
                      {pool.rewardRate.toFixed(2)}
                    </span>
                  </text>
                </box>
              </box>
            ))
          )}
        </scrollbox>
      </box>

      {/* Selected Pool Actions */}
      {selectedPool && (
        <box
          border
          borderStyle="rounded"
          borderColor="#7aa2f7"
          padding={2}
          backgroundColor="#1a1a2e"
          flexDirection="column"
          gap={1}
        >
          <text>
            <span fg="#7aa2f7">
              <strong>[ POOL ACTIONS ]</strong>
            </span>
            <span fg="#888888">
              {" "}
              - {pools.find((p) => p.id === selectedPool)?.memeName}
            </span>
          </text>

          <box flexDirection="row" gap={2} alignItems="center" marginTop={1}>
            <text>
              <span fg="#888888">Amount:</span>
            </text>
            <input
              value={stakeAmount}
              onChange={setStakeAmount}
              placeholder="Enter amount..."
              width={20}
              backgroundColor="#2a2a4e"
              textColor="#ffffff"
              focused
            />
            <box
              border
              borderStyle="rounded"
              borderColor="#00ff88"
              paddingLeft={2}
              paddingRight={2}
              backgroundColor="#1a3a1e"
              onMouseDown={() => {
                const amount = parseFloat(stakeAmount);
                if (amount > 0) onStake(selectedPool, amount);
              }}
            >
              <text>
                <span fg="#00ff88">[+] Stake</span>
              </text>
            </box>
            <box
              border
              borderStyle="rounded"
              borderColor="#ff8844"
              paddingLeft={2}
              paddingRight={2}
              backgroundColor="#3a2a1a"
              onMouseDown={() => {
                const amount = parseFloat(stakeAmount);
                if (amount > 0) onUnstake(selectedPool, amount);
              }}
            >
              <text>
                <span fg="#ff8844">[-] Unstake</span>
              </text>
            </box>
            <box
              border
              borderStyle="rounded"
              borderColor="#ffaa00"
              paddingLeft={2}
              paddingRight={2}
              backgroundColor="#3a3a1a"
              onMouseDown={() => onClaim(selectedPool)}
            >
              <text>
                <span fg="#ffaa00">[C] Claim Rewards</span>
              </text>
            </box>
          </box>
        </box>
      )}

      {/* Your Tokens */}
      <box
        border
        borderStyle="single"
        borderColor="#3a3a5e"
        padding={1}
        backgroundColor="#1a1a2e"
        flexDirection="column"
      >
        <text>
          <span fg="#7aa2f7">
            <strong>[ YOUR TOKENS ]</strong>
          </span>
        </text>
        <box flexDirection="row" flexWrap="wrap" gap={2} marginTop={1}>
          {memeCoins.length === 0 ? (
            <text>
              <span fg="#666666">No tokens yet. Mine some memes!</span>
            </text>
          ) : (
            memeCoins.slice(0, 8).map((coin) => (
              <box
                key={coin.mintAddress}
                border
                borderStyle="rounded"
                borderColor="#3a3a5e"
                paddingLeft={1}
                paddingRight={1}
              >
                <text>
                  <span fg="#00ff88">{coin.symbol}</span>
                  <span fg="#888888">: </span>
                  <span fg="#ffffff">
                    {coin.balance.toLocaleString()}
                  </span>
                </text>
              </box>
            ))
          )}
        </box>
      </box>
    </box>
  );
}
