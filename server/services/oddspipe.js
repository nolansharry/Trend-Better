const fetch = require("node-fetch");

const BASE_URL = "https://oddspipe.com/v1";
const API_KEY = process.env.ODDSPIPE_API_KEY;

const headers = {
  "X-API-Key": API_KEY,
  "Content-Type": "application/json",
};

// Fetch spreads across platforms
async function getSpreads(minSpread = 0.03) {
  const res = await fetch(
    `${BASE_URL}/spreads?min_spread=${minSpread}`,
    { headers }
  );
  if (!res.ok) throw new Error(`OddsPipe spreads error: ${res.status}`);
  return res.json();
}

// Fetch candlesticks for a specific market
async function getCandlesticks(marketId, interval = "1h") {
  const res = await fetch(
    `${BASE_URL}/markets/${marketId}/candlesticks?interval=${interval}`,
    { headers }
  );
  if (!res.ok) throw new Error(`OddsPipe candlesticks error: ${res.status}`);
  return res.json();
}

// Search markets by keyword
async function searchMarkets(query, platform = null) {
  const params = new URLSearchParams({ q: query });
  if (platform) params.append("platform", platform);

  const res = await fetch(
    `${BASE_URL}/markets/search?${params}`,
    { headers }
  );
  if (!res.ok) throw new Error(`OddsPipe search error: ${res.status}`);
  return res.json();
}

module.exports = { getSpreads, getCandlesticks, searchMarkets };