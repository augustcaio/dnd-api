const deitiesService = require('../services/deitiesService');

const list = async (_req, res, next) => {
  try {
    const deities = await deitiesService.findAll();
    res.json({ count: deities.length, data: deities });
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const deity = await deitiesService.findById(id);
    res.json({ data: deity });
  } catch (err) {
    next(err);
  }
};

module.exports = { list, getById };
