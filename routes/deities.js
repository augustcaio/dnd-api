const { Router } = require('express');
const deitiesController = require('../controllers/deitiesController');

const router = Router();

router.get('/', deitiesController.list);
router.get('/:id', deitiesController.getById);

module.exports = router;
