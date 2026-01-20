# Solana Meme Farm

A terminal app where you mine ASCII memes, stake fake tokens, and vote on meme evolution. It's like if DeFi and shitposting had a baby that only knew how to live in a terminal.

## Why

I wanted to learn OpenTUI and also I think the idea of "farming" memes in a terminal is funny. This could actually be hooked up to real Solana transactions if you're brave enough.

## Run it

```bash
bun install
bun run start
```

or if you want hot reload while hacking on it:

```bash
bun run dev
```

## How to use

Press numbers to switch views:

- `1` - Mine memes (watch ASCII art get generated)
- `2` - Farm/stake your meme coins
- `3` - Vote on meme evolution (mutate, evolve, merge)
- `4` - Gallery of all your memes
- `5` - Wallet stuff

Press `?` for help. Press `Esc` to quit.

### Mining

Hit `s` to start mining. You'll see a progress bar and when it fills up, boom - new meme. Memes have rarities:

- common (gray) - whatever
- rare (blue) - nice
- epic (purple) - ooh
- legendary (gold) - you're basically rich now

Each meme comes with random traits like "diamond-hands" or "laser-eyes" and its own token symbol.

### Farming

Once you have meme tokens, you can stake them in pools. Higher APR = more tokens. Click a pool, enter amount, stake. Revolutionary stuff.

### Voting

Pick a meme and vote to:
- **Evolve** - level it up
- **Mutate** - randomly change some ASCII chars
- **Merge** - smash two memes together (frankenstein style)

The idea is this could trigger on-chain votes with real token holders. For now it just updates local state.

## Project structure

```
src/
├── components/     # all the UI pieces
├── hooks/          # useMining, useTransactions, etc
├── utils/
│   ├── memeGenerator.ts   # the ASCII art templates + generation
│   └── solana.ts          # mock wallet stuff
└── types/
```

The meme templates are in `memeGenerator.ts` if you want to add more. Current ones: doge, pepe, wojak, moon, rocket, diamond, cat, ape.

## The stack

- [Bun](https://bun.sh) - runtime
- [OpenTUI](https://github.com/anomalyco/opentui) - terminal UI framework
- React - because I know it

## Making it real

Right now the Solana stuff is mocked. If you actually wanted to connect this to devnet/mainnet:

1. Swap out `createMockWallet()` with actual wallet adapter
2. Add `@solana/web3.js` for transactions
3. The meme minting could create actual NFTs or SPL tokens
4. Voting could use realms or your own program

The transaction/wallet types are already structured for this - just need real implementations.

## Known issues

- The emojis in the sidebar might look weird depending on your terminal font
- If your terminal is too small things will overlap weirdly
- The "merge" feature doesn't actually combine ASCII art intelligently, it just takes top half of one and bottom half of another

## Contributing

PRs are welcome. Add more meme templates, fix bugs, make it actually talk to Solana, whatever.

## License

MIT - do whatever you want with it
