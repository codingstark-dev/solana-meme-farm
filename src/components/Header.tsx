import React from "react";

interface HeaderProps {
  balance: number;
  walletAddress: string;
  notifications: number;
}

export function Header({ balance, walletAddress, notifications }: HeaderProps) {
  const shortAddress = `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`;

  return (
    <box
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      paddingLeft={2}
      paddingRight={2}
      height={3}
      backgroundColor="#1a1a2e"
      border={["bottom"]}
      borderStyle="single"
      borderColor="#3a3a5e"
    >
      <box flexDirection="row" gap={1} alignItems="center">
        <ascii-font text="MEMEFARM" font="tiny" color="#00ff88" />
      </box>

      <box flexDirection="row" gap={3} alignItems="center">
        <box flexDirection="row" gap={1}>
          <text>
            <span fg="#888888">SOL:</span>
          </text>
          <text>
            <span fg="#00ff88">
              <strong>{balance.toFixed(4)}</strong>
            </span>
          </text>
        </box>

        <box flexDirection="row" gap={1}>
          <text>
            <span fg="#888888">Wallet:</span>
          </text>
          <text>
            <span fg="#7aa2f7">{shortAddress}</span>
          </text>
        </box>

        {notifications > 0 && (
          <box backgroundColor="#ff4444" paddingLeft={1} paddingRight={1}>
            <text>
              <span fg="#ffffff">
                <strong>{notifications}</strong>
              </span>
            </text>
          </box>
        )}
      </box>
    </box>
  );
}
