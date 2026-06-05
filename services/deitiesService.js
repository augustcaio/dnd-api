const prisma = require('../utils/prisma');
const { createError } = require('../middleware/errorHandler');

const findAll = async () => {
  return prisma.deity.findMany({ orderBy: { name: 'asc' } });
};

const findById = async (id) => {
  const deity = await prisma.deity.findUnique({ where: { id } });
  if (!deity) throw createError(404, 'Deity not found');
  return deity;
};

module.exports = { findAll, findById };
