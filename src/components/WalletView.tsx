import React from "react";
import type { Wallet, MemeCoin, Transaction } from "../types";
import { formatAddress } from "../utils/solana";

interface WalletViewProps {
  wallet: Wallet;
  memeCoins: MemeCoin[];
  transactions: Transaction[];
  onConnect: () => void;
  onDisconnect: () => void;
}

export function WalletView({
  wallet,
  memeCoins,
  transactions,
  onConnect,
  onDisconnect,
}: WalletViewProps) {
  const totalValue = memeCoins.reduce(
    (acc, coin) => acc + coin.balance * coin.price,
    0
  );

  return (
    <box flexDirection="column" padding={2} gap={2} flexGrow={1}>
      {/* Title */}
      <ascii-font text="WALLET" font="tiny" color="#7aa2f7" />

      {/* Wallet Info */}
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
            <strong>[ WALLET INFO ]</strong>
          </span>
        </text>

        <box flexDirection="row" gap={4} marginTop={1}>
          <box flexDirection="column" gap={1}>
            <text>
              <span fg="#888888">Address:</span>
            </text>
            <text>
              <span fg="#ffffff">{wallet.address}</span>
            </text>
          </box>
        </box>

        <box flexDirection="row" gap={4} marginTop={1}>
          <box
            border
            borderStyle="rounded"
            borderColor="#3a3a5e"
            padding={1}
            paddingLeft={2}
            paddingRight={2}
            backgroundColor="#0a0a1e"
          >
            <text>
              <span fg="#888888">SOL Balance</span>
              <br />
              <span fg="#00ff88">
                <strong>{wallet.balance.toFixed(4)} SOL</strong>
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
            backgroundColor="#0a0a1e"
          >
            <text>
              <span fg="#888888">Portfolio Value</span>
              <br />
              <span fg="#ffaa00">
                <strong>${totalValue.toFixed(4)}</strong>
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
            backgroundColor="#0a0a1e"
          >
            <text>
              <span fg="#888888">Tokens</span>
              <br />
              <span fg="#7aa2f7">
                <strong>{memeCoins.length}</strong>
              </span>
            </text>
          </box>
        </box>

        <box flexDirection="row" gap={2} marginTop={1}>
          <box
            border
            borderStyle="rounded"
            borderColor={wallet.connected ? "#ff4444" : "#00ff88"}
            paddingLeft={2}
            paddingRight={2}
            padding={1}
            backgroundColor={wallet.connected ? "#3a1a1a" : "#1a3a1e"}
            onMouseDown={wallet.connected ? onDisconnect : onConnect}
          >
            <text>
              <span fg={wallet.connected ? "#ff4444" : "#00ff88"}>
                {wallet.connected ? "[D] Disconnect" : "[C] Connect Wallet"}
              </span>
            </text>
          </box>
        </box>
      </box>

      {/* Token Holdings */}
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
            <strong>[ TOKEN HOLDINGS ]</strong>
          </span>
        </text>

        {/* Header */}
        <box flexDirection="row" gap={2} marginTop={1} paddingBottom={1}>
          <box width={12}>
            <text>
              <span fg="#666666">Symbol</span>
            </text>
          </box>
          <box width={20}>
            <text>
              <span fg="#666666">Name</span>
            </text>
          </box>
          <box width={15}>
            <text>
              <span fg="#666666">Balance</span>
            </text>
          </box>
          <box width={12}>
            <text>
              <span fg="#666666">Price</span>
            </text>
          </box>
          <box width={15}>
            <text>
              <span fg="#666666">Value</span>
            </text>
          </box>
        </box>

        <scrollbox height={8}>
          {memeCoins.length === 0 ? (
            <text>
              <span fg="#666666">No tokens yet. Mine some memes!</span>
            </text>
          ) : (
            memeCoins.map((coin) => (
              <box key={coin.mintAddress} flexDirection="row" gap={2} paddingTop={1}>
                <box width={12}>
                  <text>
                    <span fg="#00ff88">{coin.symbol}</span>
                  </text>
                </box>
                <box width={20}>
                  <text>
                    <span fg="#ffffff">{coin.name}</span>
                  </text>
                </box>
                <box width={15}>
                  <text>
                    <span fg="#7aa2f7">
                      {coin.balance.toLocaleString()}
                    </span>
                  </text>
                </box>
                <box width={12}>
                  <text>
                    <span fg="#888888">${coin.price.toFixed(6)}</span>
                  </text>
                </box>
                <box width={15}>
                  <text>
                    <span fg="#ffaa00">
                      ${(coin.balance * coin.price).toFixed(4)}
                    </span>
                  </text>
                </box>
              </box>
            ))
          )}
        </scrollbox>
      </box>

      {/* Recent Transactions */}
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
            <strong>[ RECENT TRANSACTIONS ]</strong>
          </span>
        </text>

        <scrollbox height={6}>
          {transactions.length === 0 ? (
            <text>
              <span fg="#666666">No transactions yet.</span>
            </text>
          ) : (
            transactions.slice(0, 10).map((tx) => (
              <box key={tx.id} flexDirection="row" gap={2} paddingTop={1}>
                <text>
                  <span
                    fg={
                      tx.status === "confirmed"
                        ? "#00ff88"
                        : tx.status === "failed"
                        ? "#ff4444"
                        : "#ffaa00"
                    }
                  >
                    [{tx.status.slice(0, 1).toUpperCase()}]
                  </span>
                </text>
                <text>
                  <span fg="#7aa2f7">{tx.type.toUpperCase()}</span>
                </text>
                <text>
                  <span fg="#ffffff">
                    {tx.amount.toLocaleString()} {tx.symbol}
                  </span>
                </text>
                <text>
                  <span fg="#888888">
                    {new Date(tx.timestamp).toLocaleTimeString()}
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
