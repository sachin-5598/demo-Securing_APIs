const express = require('express');
const axios = require('axios');

const middleware = require('./middleware');

const BASE_URL = 'https://api.nasa.gov/insight_weather/?';

const router = express.Router();

// in-memory cache
let cacheData;
let cacheTime;

router.get('/',
  middleware.limiter,
  middleware.speedLimiter,
  middleware.checkCustomAPIKey,
  async (req, res, next) => {
  // in-memory cache
    if (cacheTime && cacheTime > Date.now() - 30 * 1000) {
      return res.json(cacheData);
    }
    try {
      const params = new URLSearchParams({
        api_key: process.env.NASA_API_KEY,
        feedtype: 'json',
        ver: '1.0',
      });
      // 1. make nasa api call
      const { data } = await axios.get(`${BASE_URL}${params}`);
      // 2. return the data from the nasa api
      cacheData = data;
      cacheTime = Date.now();
      return res.json(data);
    } catch (error) {
      return next(error);
    }
  });

module.exports = router;
