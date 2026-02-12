const express = require('express');
const router = express.Router();
const { validateFeatureInput } = require('../middleware/validator');
const {
  generateSpecification,
  getRecentSpecifications,
  getSpecification,
  updateSpecification,
  deleteSpecification,
} = require('../controllers/specificationController');

router.post('/generate', validateFeatureInput, generateSpecification);
router.get('/recent', getRecentSpecifications);
router.get('/:id', getSpecification);
router.put('/:id', updateSpecification);
router.delete('/:id', deleteSpecification);

module.exports = router;