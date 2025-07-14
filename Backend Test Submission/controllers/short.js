
const Link = require("../models/link");
const generateCode = require("../utils/generateCode");
const Log = require("../../Logging Middleware/log");

const createShortUrl = async (req, res) => {
  const { url, validity = 30, shortcode } = req.body;
  try {
    const code = shortcode || generateCode();
    const existing = await Link.findOne({ shortcode: code });
    if (existing) {
      await Log("backend", "error", "handler", "shortcode already exists");
      return res.status(400).json({ message: "Shortcode already exists" });
    }
    const expiry = new Date(Date.now() + validity * 60000);
    const newLink = await Link.create({ originalUrl: url, shortcode: code, expiresAt: expiry });
    await Log("backend", "info", "handler", "short URL created");
    res.status(201).json({
      shortLink: `http://localhost:3000/${code}`,
      expiry: expiry.toISOString()
    });
  } catch (err) {
    await Log("backend", "fatal", "db", "Failed to create short URL");
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { createShortUrl };
