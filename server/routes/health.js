const express = require('express');
const router = express.Router();
const {
  getDetailedHealth,
  getLiveness,
  getReadiness,
  getMetrics,
} = require('../controllers/healthController');

router.get('/', getDetailedHealth);
router.get('/live', getLiveness);
router.get('/ready', getReadiness);
router.get('/metrics', getMetrics);

module.exports = router;