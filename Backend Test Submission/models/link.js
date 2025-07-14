
const mongoose = require("mongoose");

const clickSchema = new mongoose.Schema({
  time: Date,
  referrer: String,
  location: String,
});

const linkSchema = new mongoose.Schema({
  originalUrl: String,
  shortcode: String,
  expiresAt: Date,
  createdAt: { type: Date, default: Date.now },
  totalClicks: { type: Number, default: 0 },
  clicks: [clickSchema],
});

module.exports = mongoose.model("Link", linkSchema);
