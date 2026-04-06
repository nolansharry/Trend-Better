const express = require("express");
const router = express.Router();
const Market = require("../models/Market");
const { syncAll, syncCandlesticks, isCacheStale } = require("../services/marketSync");

// GET /api/markets — return cached spreads, refresh if stale
router.get("/", async (req, res) => {
  try {
    const markets = await Market.find().sort({ "spread.yes_diff": -1 });

    // Refresh cache in background if stale
    if (markets.length === 0 || isCacheStale(markets[0].cachedAt)) {
      syncAll().catch(console.error);     // non-blocking background sync
    }

    res.json(markets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/markets/search?q=trump&platform=polymarket
router.get("/search", async (req, res) => {
  try {
    const { q, platform } = req.query;
    const query = { title: { $regex: q, $options: "i" } };
    if (platform) query.platform = platform;

    const results = await Market.find(query).limit(20);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/markets/:id/candlesticks
router.get("/:id/candlesticks", async (req, res) => {
  try {
    const market = await Market.findOne({ marketId: req.params.id });

    // Refresh candlesticks if stale or missing
    if (!market || isCacheStale(market.cachedAt)) {
      await syncCandlesticks(req.params.id);
    }

    const updated = await Market.findOne({ marketId: req.params.id });
    if (!updated) return res.status(404).json({ error: "Market not found" });

    res.json(updated.candlesticks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;