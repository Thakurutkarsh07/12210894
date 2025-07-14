
const express = require("express");
const { handleRedirect, fetchStats } = require("../controllers/redirect");
const router = express.Router();

router.get("/shorturls/:code", fetchStats);
router.get("/:code", handleRedirect);

module.exports = router;
