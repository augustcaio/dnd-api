const prisma = require('../utils/prisma');
const { createError } = require('../middleware/errorHandler');

const findAll = async (filters = {}) => {
  const where = {};
  if (filters.dominio) {
    where.suggestedDomains = { has: filters.dominio };
  }
  if (filters.tendencia) {
    where.alignment = filters.tendencia;
  }
  return prisma.deity.findMany({ where, orderBy: { name: 'asc' } });
};

const findById = async (id) => {
  const deity = await prisma.deity.findUnique({ where: { id } });
  if (!deity) throw createError(404, 'Deity not found');
  return deity;
};

module.exports = { findAll, findById };
