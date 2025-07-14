
const express = require("express");
const { createShortUrl } = require("../controllers/short");
const router = express.Router();

router.post("/", createShortUrl);

module.exports = router;
