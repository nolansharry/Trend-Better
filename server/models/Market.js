const mongoose = require("mongoose");

const CandlestickSchema = new mongoose.Schema({
  time:   { type: Date },
  open:   { type: Number },
  high:   { type: Number },
  low:    { type: Number },
  close:  { type: Number },
  volume: { type: Number },
}, { _id: false });

const MarketSchema = new mongoose.Schema({
  marketId:    { type: String, required: true, unique: true },
  title:       { type: String },
  platform:    { type: String },           // "polymarket" | "kalshi"
  spread:      {
    yes_diff:  { type: Number },
    no_diff:   { type: Number },
  },
  candlesticks: [CandlestickSchema],
  rawData:     { type: mongoose.Schema.Types.Mixed }, // full API response
  cachedAt:    { type: Date, default: Date.now },
}, { timestamps: true });

// Index for fast lookups and cache expiry checks
MarketSchema.index({ cachedAt: 1 });
MarketSchema.index({ platform: 1 });

module.exports = mongoose.model("Market", MarketSchema);