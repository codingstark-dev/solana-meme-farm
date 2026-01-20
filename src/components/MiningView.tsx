import React, { useMemo } from "react";
import type { Meme, MiningState } from "../types";
import { RARITY_COLORS } from "../utils/memeGenerator";

interface MiningViewProps {
  state: MiningState;
  onStartMining: () => void;
  onStopMining: () => void;
  recentMemes: Meme[];
  minedTokens: number;
}

export function MiningView({
  state,
  onStartMining,
  onStopMining,
  recentMemes,
  minedTokens,
}: MiningViewProps) {
  // Create ASCII progress bar
  const progressBar = useMemo(() => {
    const width = 40;
    const filled = Math.floor((state.progress / 100) * width);
    const empty = width - filled;
    return "█".repeat(filled) + "░".repeat(empty);
  }, [state.progress]);

  // Mining animation frames
  const miningAnimations = [
    "  ⛏️ Mining...  ",
    "  ⛏️  Mining... ",
    "   ⛏️  Mining...",
    "    ⛏️  Mining..",
    "   ⛏️  Mining...",
    "  ⛏️  Mining... ",
  ];

  return (
    <box flexDirection="column" padding={2} gap={2} flexGrow={1}>
      {/* Title */}
      <box flexDirection="row" justifyContent="space-between" alignItems="center">
        <ascii-font text="MEME MINER" font="tiny" color="#00ff88" />
        <box flexDirection="column" alignItems="flex-end">
          <text>
            <span fg="#888888">Hash Rate: </span>
            <span fg="#00ff88">
              <strong>{state.hashRate.toFixed(1)} MH/s</strong>
            </span>
          </text>
          <text>
            <span fg="#888888">Tokens Earned: </span>
            <span fg="#ffaa00">
              <strong>{minedTokens.toLocaleString()}</strong>
            </span>
          </text>
        </box>
      </box>

      {/* Mining Status Panel */}
      <box
        border
        borderStyle="rounded"
        borderColor="#3a3a5e"
        padding={2}
        backgroundColor="#1a1a2e"
        flexDirection="column"
        gap={1}
      >
        <text>
          <span fg="#7aa2f7">
            <strong>[ MINING STATUS ]</strong>
          </span>
        </text>

        <box flexDirection="row" gap={2}>
          <text>
            <span fg="#888888">Status: </span>
            <span fg={state.isActive ? "#00ff88" : "#ff4444"}>
              <strong>{state.isActive ? "ACTIVE" : "STOPPED"}</strong>
            </span>
          </text>
          <text>
            <span fg="#888888">Pending: </span>
            <span fg="#7aa2f7">{state.memesPending} memes</span>
          </text>
        </box>

        {/* Progress Bar */}
        <box flexDirection="column" marginTop={1}>
          <text>
            <span fg="#888888">Progress: </span>
            <span fg="#00ff88">{state.progress.toFixed(1)}%</span>
          </text>
          <text>
            <span fg="#00ff88">[</span>
            <span fg="#00ff88">{progressBar}</span>
            <span fg="#00ff88">]</span>
          </text>
        </box>

        {/* Controls */}
        <box flexDirection="row" gap={2} marginTop={1}>
          <box
            border
            borderStyle="rounded"
            borderColor={state.isActive ? "#666666" : "#00ff88"}
            paddingLeft={2}
            paddingRight={2}
            backgroundColor={state.isActive ? "#333333" : "#1a3a1e"}
            onMouseDown={state.isActive ? undefined : onStartMining}
          >
            <text>
              <span fg={state.isActive ? "#666666" : "#00ff88"}>
                [S] Start Mining
              </span>
            </text>
          </box>
          <box
            border
            borderStyle="rounded"
            borderColor={state.isActive ? "#ff4444" : "#666666"}
            paddingLeft={2}
            paddingRight={2}
            backgroundColor={state.isActive ? "#3a1a1a" : "#333333"}
            onMouseDown={state.isActive ? onStopMining : undefined}
          >
            <text>
              <span fg={state.isActive ? "#ff4444" : "#666666"}>
                [X] Stop Mining
              </span>
            </text>
          </box>
        </box>
      </box>

      {/* Current Meme Being Mined */}
      {state.currentMeme && (
        <box
          border
          borderStyle="rounded"
          borderColor={RARITY_COLORS[state.currentMeme.rarity]}
          padding={2}
          backgroundColor="#1a1a2e"
          flexDirection="column"
        >
          <text>
            <span fg="#7aa2f7">
              <strong>[ LAST MINED ]</strong>
            </span>
            <span fg={RARITY_COLORS[state.currentMeme.rarity]}>
              {" "}
              {state.currentMeme.rarity.toUpperCase()}
            </span>
          </text>
          <box flexDirection="row" gap={3} marginTop={1}>
            <box flexDirection="column">
              {state.currentMeme.ascii.slice(0, 10).map((line, i) => (
                <text key={i}>
                  <span fg={RARITY_COLORS[state.currentMeme!.rarity]}>{line}</span>
                </text>
              ))}
            </box>
            <box flexDirection="column" gap={1}>
              <text>
                <span fg="#ffffff">
                  <strong>{state.currentMeme.name}</strong>
                </span>
              </text>
              <text>
                <span fg="#888888">Symbol: </span>
                <span fg="#00ff88">{state.currentMeme.tokenSymbol}</span>
              </text>
              <text>
                <span fg="#888888">Gen: </span>
                <span fg="#7aa2f7">{state.currentMeme.generation}</span>
              </text>
              <text>
                <span fg="#888888">Traits:</span>
              </text>
              {state.currentMeme.traits.map((trait, i) => (
                <text key={i}>
                  <span fg="#bb9af7">  • {trait}</span>
                </text>
              ))}
            </box>
          </box>
        </box>
      )}

      {/* Recent Memes */}
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
            <strong>[ RECENT MEMES ]</strong>
          </span>
        </text>
        <scrollbox height={8} focused={false}>
          {recentMemes.length === 0 ? (
            <text>
              <span fg="#666666">No memes mined yet. Start mining!</span>
            </text>
          ) : (
            recentMemes.slice(0, 10).map((meme, i) => (
              <box key={meme.id} flexDirection="row" gap={2} paddingTop={1}>
                <text>
                  <span fg={RARITY_COLORS[meme.rarity]}>●</span>
                </text>
                <text>
                  <span fg="#ffffff">{meme.name}</span>
                </text>
                <text>
                  <span fg="#888888">{meme.tokenSymbol}</span>
                </text>
                <text>
                  <span fg={RARITY_COLORS[meme.rarity]}>
                    [{meme.rarity}]
                  </span>
                </text>
              </box>
            ))
          )}
        </scrollbox>
      </box>
    </box>
  );
}
