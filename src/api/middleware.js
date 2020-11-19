const rateLimit = require('express-rate-limit');
const slowDown = require('express-slow-down');

const limiter = rateLimit({
  windowMs: 30 * 1000, // 30 sec
  max: 5, // limit each IP to 5 requests per windowMs
});

const speedLimiter = slowDown({
  windowMs: 30 * 1000, // 30 sec
  delayAfter: 1, // allow 1 requests per 30 sec, then...
  delayMs: 500, // begin adding 500ms of delay per request above 100:
  // request # 101 is delayed by  500ms
  // request # 102 is delayed by 1000ms
  // request # 103 is delayed by 1500ms
  // etc.
});

const apiKeys = new Map();
apiKeys.set('12345', true);

function checkCustomAPIKey(req, res, next) {
  const apiKey = req.get('X-API-KEY');
  if (apiKeys.has(apiKey) && apiKeys.get(apiKey)) {
    next();
  } else {
    const error = new Error('Invalid API Key');
    res.status(401);
    next(error);
  }
}

module.exports = {
  limiter,
  speedLimiter,
  checkCustomAPIKey,
};
