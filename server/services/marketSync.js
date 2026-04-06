const Market = require("../models/Market");
const { getSpreads, getCandlesticks } = require("./oddspipe");

const CACHE_MINUTES = parseInt(process.env.ODDSPIPE_CACHE_MINUTES) || 5;

// Check if cache is still fresh
function isCacheStale(cachedAt) {
  const ageMs = Date.now() - new Date(cachedAt).getTime();
  return ageMs > CACHE_MINUTES * 60 * 1000;
}

// Sync spreads from OddsPipe into MongoDB
async function syncSpreads() {
  console.log("Syncing spreads from OddsPipe...");
  try {
    const data = await getSpreads();
    const items = data.items || [];

    for (const item of items) {
      await Market.findOneAndUpdate(
        { marketId: item.id },           // match on unique market ID
        {
          marketId:  item.id,
          title:     item.title,
          platform:  item.platform,
          spread:    item.spread,
          rawData:   item,
          cachedAt:  new Date(),
        },
        { upsert: true, new: true }      // create if not exists, update if it does
      );
    }
    console.log(`✅ Synced ${items.length} markets`);
  } catch (err) {
    console.error("❌ Spread sync failed:", err.message);
  }
}

// Sync candlesticks for a specific market
async function syncCandlesticks(marketId) {
  try {
    const data = await getCandlesticks(marketId);
    await Market.findOneAndUpdate(
      { marketId },
      { candlesticks: data.candles || [], cachedAt: new Date() },
      { upsert: true, new: true }
    );
  } catch (err) {
    console.error(`❌ Candlestick sync failed for ${marketId}:`, err.message);
  }
}

// Main sync — call this on a schedule
async function syncAll() {
  await syncSpreads();
}

module.exports = { syncAll, syncCandlesticks, isCacheStale };