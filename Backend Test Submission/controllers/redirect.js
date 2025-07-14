
const Link = require("../models/link");
const Log = require("../../Logging Middleware/log");

const handleRedirect = async (req, res) => {
  const { code } = req.params;
  try {
    const link = await Link.findOne({ shortcode: code });
    if (!link) {
      await Log("backend", "error", "handler", "shortcode not found");
      return res.status(404).json({ message: "Not found" });
    }
    if (new Date() > link.expiresAt) {
      await Log("backend", "warn", "handler", "shortcode expired");
      return res.status(410).json({ message: "Link expired" });
    }
    link.clicks.push({ time: new Date(), referrer: req.get("referrer") || "", location: req.ip });
    link.totalClicks += 1;
    await link.save();
    await Log("backend", "info", "handler", "redirecting to original URL");
    res.redirect(link.originalUrl);
  } catch {
    await Log("backend", "fatal", "db", "Redirection failed");
    res.status(500).json({ message: "Server Error" });
  }
};

const fetchStats = async (req, res) => {
  try {
    const link = await Link.findOne({ shortcode: req.params.code });
    if (!link) return res.status(404).json({ message: "Not found" });
    res.json({
      originalUrl: link.originalUrl,
      createdAt: link.createdAt,
      expiresAt: link.expiresAt,
      totalClicks: link.totalClicks,
      clickDetails: link.clicks,
    });
  } catch {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { handleRedirect, fetchStats };
