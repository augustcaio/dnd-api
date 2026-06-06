const prisma = require('../utils/prisma');
const { createError } = require('../middleware/errorHandler');

const findAll = async (filters = {}) => {
  const where = {};
  if (filters.tipo) {
    where.type = filters.tipo;
  }
  return prisma.plane.findMany({ where, orderBy: { name: 'asc' } });
};

const findById = async (id) => {
  const plane = await prisma.plane.findUnique({ where: { id } });
  if (!plane) throw createError(404, 'Plane not found');
  return plane;
};

module.exports = { findAll, findById };
