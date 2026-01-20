import React from "react";

interface HelpModalProps {
  onClose: () => void;
}

export function HelpModal({ onClose }: HelpModalProps) {
  const shortcuts = [
    { category: "Navigation", items: [
      { keys: "1-5", action: "Switch views" },
      { keys: "Tab", action: "Next panel" },
      { keys: "Shift+Tab", action: "Previous panel" },
      { keys: "?", action: "Toggle help" },
      { keys: "Esc", action: "Close modal / Exit" },
    ]},
    { category: "Mining", items: [
      { keys: "S", action: "Start mining" },
      { keys: "X", action: "Stop mining" },
    ]},
    { category: "Farming", items: [
      { keys: "Enter", action: "Select pool" },
      { keys: "+", action: "Stake tokens" },
      { keys: "-", action: "Unstake tokens" },
      { keys: "C", action: "Claim rewards" },
    ]},
    { category: "Voting", items: [
      { keys: "E", action: "Vote to evolve" },
      { keys: "U", action: "Vote to mutate" },
      { keys: "G", action: "Vote to merge" },
      { keys: "N", action: "Create voting round" },
    ]},
    { category: "General", items: [
      { keys: "R", action: "Refresh data" },
      { keys: "Ctrl+C", action: "Exit application" },
    ]},
  ];

  return (
    <box
      position="absolute"
      left={10}
      top={5}
      width={60}
      height={35}
      border
      borderStyle="double"
      borderColor="#7aa2f7"
      backgroundColor="#1a1a2e"
      padding={2}
      flexDirection="column"
      zIndex={100}
    >
      <box flexDirection="row" justifyContent="space-between">
        <ascii-font text="HELP" font="tiny" color="#7aa2f7" />
        <box
          border
          borderStyle="rounded"
          borderColor="#ff4444"
          paddingLeft={2}
          paddingRight={2}
          onMouseDown={onClose}
        >
          <text>
            <span fg="#ff4444">[X] Close</span>
          </text>
        </box>
      </box>

      <scrollbox height={28} focused>
        {shortcuts.map((section) => (
          <box key={section.category} flexDirection="column" marginTop={1}>
            <text>
              <span fg="#bb9af7">
                <strong>[ {section.category.toUpperCase()} ]</strong>
              </span>
            </text>
            {section.items.map((item) => (
              <box key={item.keys} flexDirection="row" paddingLeft={2}>
                <box width={15}>
                  <text>
                    <span fg="#00ff88">{item.keys}</span>
                  </text>
                </box>
                <text>
                  <span fg="#888888">{item.action}</span>
                </text>
              </box>
            ))}
          </box>
        ))}

        <box marginTop={2}>
          <text>
            <span fg="#666666">
              ---
            </span>
          </text>
        </box>

        <box marginTop={1}>
          <text>
            <span fg="#ffaa00">
              <strong>About Solana Meme Farm:</strong>
            </span>
          </text>
        </box>
        <box paddingLeft={2} flexDirection="column">
          <text>
            <span fg="#888888">
              A terminal-based meme economy simulator where you
            </span>
          </text>
          <text>
            <span fg="#888888">
              mine ASCII memes, farm meme coins, and participate
            </span>
          </text>
          <text>
            <span fg="#888888">
              in community-driven meme evolution through voting.
            </span>
          </text>
        </box>

        <box marginTop={1}>
          <text>
            <span fg="#7aa2f7">
              <strong>Features:</strong>
            </span>
          </text>
        </box>
        <box paddingLeft={2} flexDirection="column">
          <text>
            <span fg="#00ff88">• Mine</span>
            <span fg="#888888"> - Generate unique ASCII memes with rarities</span>
          </text>
          <text>
            <span fg="#00ff88">• Farm</span>
            <span fg="#888888"> - Stake meme tokens for rewards</span>
          </text>
          <text>
            <span fg="#00ff88">• Vote</span>
            <span fg="#888888"> - Evolve memes through community votes</span>
          </text>
          <text>
            <span fg="#00ff88">• Gallery</span>
            <span fg="#888888"> - View your meme collection</span>
          </text>
        </box>
      </scrollbox>
    </box>
  );
}
