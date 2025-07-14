
const axios = require("axios");

const Log = async (stack, level, pkg, message) => {
  try {
    await axios.post("http://20.244.56.144/evaluation-service/logs", {
      stack,
      level,
      package: pkg,
      message,
    });
  } catch (err) {
    // Silent fail for logging errors
  }
};

module.exports = Log;
