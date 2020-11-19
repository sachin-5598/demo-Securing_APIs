const express = require('express');

const marsWeather = require('./marsWeather');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'api is working!!!',
  });
});

router.use('/marsWeather', marsWeather);

module.exports = router;
