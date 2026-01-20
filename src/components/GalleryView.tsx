import React from "react";
import type { Meme } from "../types";
import { RARITY_COLORS } from "../utils/memeGenerator";

interface GalleryViewProps {
  memes: Meme[];
  onSelectMeme: (meme: Meme) => void;
}

export function GalleryView({ memes, onSelectMeme }: GalleryViewProps) {
  // Group memes by rarity
  const byRarity = {
    legendary: memes.filter((m) => m.rarity === "legendary"),
    epic: memes.filter((m) => m.rarity === "epic"),
    rare: memes.filter((m) => m.rarity === "rare"),
    common: memes.filter((m) => m.rarity === "common"),
  };

  return (
    <box flexDirection="column" padding={2} gap={2} flexGrow={1}>
      {/* Title */}
      <box flexDirection="row" justifyContent="space-between" alignItems="center">
        <ascii-font text="MEME GALLERY" font="tiny" color="#ffaa00" />
        <box flexDirection="row" gap={3}>
          <text>
            <span fg="#ffaa00">Legendary: {byRarity.legendary.length}</span>
          </text>
          <text>
            <span fg="#aa00aa">Epic: {byRarity.epic.length}</span>
          </text>
          <text>
            <span fg="#5555ff">Rare: {byRarity.rare.length}</span>
          </text>
          <text>
            <span fg="#aaaaaa">Common: {byRarity.common.length}</span>
          </text>
        </box>
      </box>

      {/* Gallery Grid */}
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
          <span fg="#ffaa00">
            <strong>[ YOUR COLLECTION ]</strong>
          </span>
          <span fg="#888888"> - {memes.length} memes</span>
        </text>

        <scrollbox height={30} focused>
          {memes.length === 0 ? (
            <box
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              padding={4}
            >
              <text>
                <span fg="#666666">
                  Your gallery is empty!
                </span>
              </text>
              <text>
                <span fg="#888888">
                  Start mining to collect memes.
                </span>
              </text>
            </box>
          ) : (
            <box flexDirection="row" flexWrap="wrap" gap={2} padding={1}>
              {memes.map((meme) => (
                <box
                  key={meme.id}
                  border
                  borderStyle="rounded"
                  borderColor={RARITY_COLORS[meme.rarity]}
                  padding={1}
                  backgroundColor="#0a0a1e"
                  width={32}
                  flexDirection="column"
                  onMouseDown={() => onSelectMeme(meme)}
                >
                  {/* Meme Header */}
                  <box flexDirection="row" justifyContent="space-between">
                    <text>
                      <span fg="#ffffff">
                        <strong>{meme.name.slice(0, 12)}</strong>
                      </span>
                    </text>
                    <text>
                      <span fg={RARITY_COLORS[meme.rarity]}>
                        {meme.rarity.slice(0, 1).toUpperCase()}
                      </span>
                    </text>
                  </box>

                  {/* Meme ASCII (truncated) */}
                  <box marginTop={1}>
                    {meme.ascii.slice(0, 5).map((line, i) => (
                      <text key={i}>
                        <span fg={RARITY_COLORS[meme.rarity]}>
                          {line.slice(0, 28)}
                        </span>
                      </text>
                    ))}
                    {meme.ascii.length > 5 && (
                      <text>
                        <span fg="#666666">  ...</span>
                      </text>
                    )}
                  </box>

                  {/* Meme Stats */}
                  <box flexDirection="row" gap={2} marginTop={1}>
                    <text>
                      <span fg="#888888">G</span>
                      <span fg="#7aa2f7">{meme.generation}</span>
                    </text>
                    <text>
                      <span fg="#888888">V</span>
                      <span fg="#bb9af7">{meme.votes}</span>
                    </text>
                    <text>
                      <span fg="#00ff88">{meme.tokenSymbol}</span>
                    </text>
                  </box>
                </box>
              ))}
            </box>
          )}
        </scrollbox>
      </box>

      {/* Legend */}
      <box flexDirection="row" gap={4} justifyContent="center">
        <text>
          <span fg="#888888">Click a meme to view details | </span>
          <span fg="#7aa2f7">[V]</span>
          <span fg="#888888"> Vote | </span>
          <span fg="#00ff88">[S]</span>
          <span fg="#888888"> Stake</span>
        </text>
      </box>
    </box>
  );
}
