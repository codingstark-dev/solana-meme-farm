import React, { useState } from "react";
import type { Meme, VotingRound } from "../types";
import { RARITY_COLORS } from "../utils/memeGenerator";

interface VotingViewProps {
  memes: Meme[];
  votingRounds: VotingRound[];
  onVote: (memeId: string, voteType: "evolve" | "mutate" | "merge") => void;
  onCreateRound: (memeId: string) => void;
}

export function VotingView({
  memes,
  votingRounds,
  onVote,
  onCreateRound,
}: VotingViewProps) {
  const [selectedMeme, setSelectedMeme] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"memes" | "rounds">("memes");

  const activeMeme = memes.find((m) => m.id === selectedMeme);

  return (
    <box flexDirection="column" padding={2} gap={2} flexGrow={1}>
      {/* Title */}
      <box flexDirection="row" justifyContent="space-between" alignItems="center">
        <ascii-font text="MEME VOTING" font="tiny" color="#bb9af7" />
        <box flexDirection="row" gap={2}>
          <box
            border
            borderStyle="rounded"
            borderColor={viewMode === "memes" ? "#bb9af7" : "#3a3a5e"}
            paddingLeft={2}
            paddingRight={2}
            backgroundColor={viewMode === "memes" ? "#2a1a3e" : "#1a1a2e"}
            onMouseDown={() => setViewMode("memes")}
          >
            <text>
              <span fg={viewMode === "memes" ? "#bb9af7" : "#666666"}>
                [M] Memes
              </span>
            </text>
          </box>
          <box
            border
            borderStyle="rounded"
            borderColor={viewMode === "rounds" ? "#bb9af7" : "#3a3a5e"}
            paddingLeft={2}
            paddingRight={2}
            backgroundColor={viewMode === "rounds" ? "#2a1a3e" : "#1a1a2e"}
            onMouseDown={() => setViewMode("rounds")}
          >
            <text>
              <span fg={viewMode === "rounds" ? "#bb9af7" : "#666666"}>
                [R] Rounds
              </span>
            </text>
          </box>
        </box>
      </box>

      <box flexDirection="row" gap={2} flexGrow={1}>
        {/* Meme/Round List */}
        <box
          border
          borderStyle="single"
          borderColor="#3a3a5e"
          padding={1}
          backgroundColor="#1a1a2e"
          flexDirection="column"
          width={40}
        >
          <text>
            <span fg="#bb9af7">
              <strong>
                [ {viewMode === "memes" ? "YOUR MEMES" : "VOTING ROUNDS"} ]
              </strong>
            </span>
          </text>

          <scrollbox height={20} focused>
            {viewMode === "memes" ? (
              memes.length === 0 ? (
                <text>
                  <span fg="#666666">No memes yet. Mine some first!</span>
                </text>
              ) : (
                memes.map((meme) => (
                  <box
                    key={meme.id}
                    flexDirection="row"
                    gap={1}
                    paddingTop={1}
                    backgroundColor={
                      selectedMeme === meme.id ? "#2a2a4e" : "transparent"
                    }
                    onMouseDown={() => setSelectedMeme(meme.id)}
                  >
                    <text>
                      <span fg={RARITY_COLORS[meme.rarity]}>●</span>
                    </text>
                    <text>
                      <span fg="#ffffff">{meme.name}</span>
                    </text>
                    <text>
                      <span fg="#888888">G{meme.generation}</span>
                    </text>
                    <text>
                      <span fg="#7aa2f7">{meme.votes}v</span>
                    </text>
                  </box>
                ))
              )
            ) : votingRounds.length === 0 ? (
              <text>
                <span fg="#666666">No active voting rounds.</span>
              </text>
            ) : (
              votingRounds.map((round) => (
                <box
                  key={round.id}
                  flexDirection="column"
                  paddingTop={1}
                  paddingBottom={1}
                  backgroundColor={
                    round.status === "active" ? "#1a2a1e" : "#1a1a2e"
                  }
                >
                  <text>
                    <span fg={round.status === "active" ? "#00ff88" : "#888888"}>
                      [{round.status.toUpperCase()}]
                    </span>
                    <span fg="#ffffff">
                      {" "}
                      {memes.find((m) => m.id === round.memeId)?.name}
                    </span>
                  </text>
                  <text>
                    <span fg="#00ff88">+{round.votesFor}</span>
                    <span fg="#888888"> / </span>
                    <span fg="#ff4444">-{round.votesAgainst}</span>
                  </text>
                </box>
              ))
            )}
          </scrollbox>
        </box>

        {/* Selected Meme Preview */}
        <box flexDirection="column" gap={2} flexGrow={1}>
          {activeMeme ? (
            <>
              <box
                border
                borderStyle="rounded"
                borderColor={RARITY_COLORS[activeMeme.rarity]}
                padding={2}
                backgroundColor="#1a1a2e"
                flexDirection="column"
              >
                <text>
                  <span fg="#ffffff">
                    <strong>{activeMeme.name}</strong>
                  </span>
                  <span fg={RARITY_COLORS[activeMeme.rarity]}>
                    {" "}
                    [{activeMeme.rarity.toUpperCase()}]
                  </span>
                </text>

                <box marginTop={1}>
                  {activeMeme.ascii.map((line, i) => (
                    <text key={i}>
                      <span fg={RARITY_COLORS[activeMeme.rarity]}>{line}</span>
                    </text>
                  ))}
                </box>

                <box flexDirection="row" gap={2} marginTop={1}>
                  <text>
                    <span fg="#888888">Gen: </span>
                    <span fg="#7aa2f7">{activeMeme.generation}</span>
                  </text>
                  <text>
                    <span fg="#888888">Votes: </span>
                    <span fg="#bb9af7">{activeMeme.votes}</span>
                  </text>
                  <text>
                    <span fg="#888888">Token: </span>
                    <span fg="#00ff88">{activeMeme.tokenSymbol}</span>
                  </text>
                </box>

                <box flexDirection="row" flexWrap="wrap" gap={1} marginTop={1}>
                  {activeMeme.traits.map((trait, i) => (
                    <box
                      key={i}
                      border
                      borderStyle="rounded"
                      borderColor="#3a3a5e"
                      paddingLeft={1}
                      paddingRight={1}
                    >
                      <text>
                        <span fg="#bb9af7">{trait}</span>
                      </text>
                    </box>
                  ))}
                </box>
              </box>

              {/* Voting Actions */}
              <box
                border
                borderStyle="single"
                borderColor="#3a3a5e"
                padding={2}
                backgroundColor="#1a1a2e"
                flexDirection="column"
                gap={1}
              >
                <text>
                  <span fg="#bb9af7">
                    <strong>[ EVOLUTION OPTIONS ]</strong>
                  </span>
                </text>
                <text>
                  <span fg="#888888">
                    Vote to evolve this meme on-chain!
                  </span>
                </text>

                <box flexDirection="row" gap={2} marginTop={1}>
                  <box
                    border
                    borderStyle="rounded"
                    borderColor="#00ff88"
                    paddingLeft={2}
                    paddingRight={2}
                    padding={1}
                    backgroundColor="#1a3a1e"
                    onMouseDown={() => onVote(activeMeme.id, "evolve")}
                  >
                    <text>
                      <span fg="#00ff88">[E] Evolve</span>
                    </text>
                  </box>
                  <box
                    border
                    borderStyle="rounded"
                    borderColor="#ffaa00"
                    paddingLeft={2}
                    paddingRight={2}
                    padding={1}
                    backgroundColor="#3a3a1a"
                    onMouseDown={() => onVote(activeMeme.id, "mutate")}
                  >
                    <text>
                      <span fg="#ffaa00">[U] Mutate</span>
                    </text>
                  </box>
                  <box
                    border
                    borderStyle="rounded"
                    borderColor="#7aa2f7"
                    paddingLeft={2}
                    paddingRight={2}
                    padding={1}
                    backgroundColor="#1a2a3e"
                    onMouseDown={() => onVote(activeMeme.id, "merge")}
                  >
                    <text>
                      <span fg="#7aa2f7">[G] Merge</span>
                    </text>
                  </box>
                </box>

                <box marginTop={1}>
                  <box
                    border
                    borderStyle="rounded"
                    borderColor="#bb9af7"
                    paddingLeft={2}
                    paddingRight={2}
                    padding={1}
                    backgroundColor="#2a1a3e"
                    onMouseDown={() => onCreateRound(activeMeme.id)}
                  >
                    <text>
                      <span fg="#bb9af7">[N] Create New Voting Round</span>
                    </text>
                  </box>
                </box>
              </box>
            </>
          ) : (
            <box
              border
              borderStyle="single"
              borderColor="#3a3a5e"
              padding={2}
              backgroundColor="#1a1a2e"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              flexGrow={1}
            >
              <text>
                <span fg="#666666">Select a meme to view and vote</span>
              </text>
            </box>
          )}
        </box>
      </box>
    </box>
  );
}
