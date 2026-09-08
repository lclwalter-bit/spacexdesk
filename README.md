# SPCX Desk

Trader hub for SpaceX public equity (`SPCX`): live Yahoo tape (RTH + pre/post), unlock cliffs, shareholder value, flight schedule, Elon/KOL primaries, news, and filings.

## Run

```bash
npm install
npm run dev          # http://localhost:5173  (Vite proxies Yahoo)
```

Production (static + Yahoo proxy):

```bash
npm run serve        # build + http://localhost:4173
```

Cloudflare (custom domain):

```bash
export CLOUDFLARE_API_TOKEN=...   # do not commit
npm run deploy                    # https://spcx.nexus
```

## Data

Curated under `src/data/` — update unlocks, flights, KOL quotes, and news as new primaries land. Price always comes from Yahoo Finance via `/api/yahoo`.

## Notes

- Extended-hours quotes use Yahoo `includePrePost=true`. There is no continuous print when the market is fully closed overnight — the last RTH/AH print is shown until pre-market opens.
- Unlock sizes are prospectus-tracked approximations; Flight 14 dates are NET targets.
- Not investment advice.
