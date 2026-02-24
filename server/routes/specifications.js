const {
  validateFeatureInput,
  validateSpecificationId,
  validateUpdateSpecification,
} = require('../middleware/validator');
const express = require('express');
const router = express.Router();

const {
  generateSpecification,
  getRecentSpecifications,
  getSpecification,
  updateSpecification,
  deleteSpecification,
} = require('../controllers/specificationController');

router.post('/generate', validateFeatureInput, generateSpecification);
router.get('/recent', getRecentSpecifications);
// router.get('/:id', getSpecification);
// router.put('/:id', updateSpecification);
// router.delete('/:id', deleteSpecification);

router.get('/:id', validateSpecificationId, getSpecification);
router.put('/:id', validateSpecificationId, validateUpdateSpecification, updateSpecification);
router.delete('/:id', validateSpecificationId, deleteSpecification);

module.exports = router;