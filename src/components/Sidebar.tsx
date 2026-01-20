import React from "react";
import type { ViewType } from "../types";

interface SidebarProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  stats: {
    totalMined: number;
    totalStaked: number;
    totalVotes: number;
  };
}

const MENU_ITEMS: { id: ViewType; label: string; icon: string; shortcut: string }[] = [
  { id: "mine", label: "Mine Memes", icon: "⛏", shortcut: "1" },
  { id: "farm", label: "Farm Coins", icon: "🌾", shortcut: "2" },
  { id: "vote", label: "Vote/Evolve", icon: "🗳", shortcut: "3" },
  { id: "gallery", label: "Meme Gallery", icon: "🖼", shortcut: "4" },
  { id: "wallet", label: "Wallet", icon: "💰", shortcut: "5" },
];

export function Sidebar({ currentView, onViewChange, stats }: SidebarProps) {
  return (
    <box
      flexDirection="column"
      width={24}
      backgroundColor="#16161e"
      border={["right"]}
      borderStyle="single"
      borderColor="#3a3a5e"
    >
      {/* Menu Items */}
      <box flexDirection="column" padding={1} gap={1}>
        <text>
          <span fg="#888888">
            <strong>NAVIGATION</strong>
          </span>
        </text>
        {MENU_ITEMS.map((item) => (
          <box
            key={item.id}
            flexDirection="row"
            paddingLeft={1}
            paddingRight={1}
            backgroundColor={currentView === item.id ? "#3a3a5e" : "transparent"}
            onMouseDown={() => onViewChange(item.id)}
          >
            <text>
              <span fg={currentView === item.id ? "#00ff88" : "#888888"}>
                [{item.shortcut}]
              </span>
              <span fg={currentView === item.id ? "#ffffff" : "#aaaaaa"}>
                {" "}
                {item.icon} {item.label}
              </span>
            </text>
          </box>
        ))}
      </box>

      {/* Stats */}
      <box flexDirection="column" flexGrow={1} />
      <box
        flexDirection="column"
        padding={1}
        gap={1}
        border={["top"]}
        borderStyle="single"
        borderColor="#3a3a5e"
      >
        <text>
          <span fg="#888888">
            <strong>STATS</strong>
          </span>
        </text>
        <text>
          <span fg="#666666">Mined: </span>
          <span fg="#00ff88">{stats.totalMined}</span>
        </text>
        <text>
          <span fg="#666666">Staked: </span>
          <span fg="#7aa2f7">{stats.totalStaked.toFixed(2)}</span>
        </text>
        <text>
          <span fg="#666666">Votes: </span>
          <span fg="#bb9af7">{stats.totalVotes}</span>
        </text>
      </box>

      {/* Help */}
      <box
        padding={1}
        border={["top"]}
        borderStyle="single"
        borderColor="#3a3a5e"
      >
        <text>
          <span fg="#666666">Press </span>
          <span fg="#7aa2f7">?</span>
          <span fg="#666666"> for help</span>
        </text>
      </box>
    </box>
  );
}
