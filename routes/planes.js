const { Router } = require('express');
const planesController = require('../controllers/planesController');

const router = Router();

router.get('/', planesController.list);
router.get('/:id', planesController.getById);

module.exports = router;
