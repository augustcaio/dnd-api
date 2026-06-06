const planesService = require('../services/planesService');

const list = async (req, res, next) => {
  try {
    const filters = {};
    if (req.query.tipo) filters.tipo = req.query.tipo;
    const planes = await planesService.findAll(filters);
    res.json({ count: planes.length, data: planes });
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const plane = await planesService.findById(id);
    res.json({ data: plane });
  } catch (err) {
    next(err);
  }
};

module.exports = { list, getById };
