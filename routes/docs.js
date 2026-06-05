const { Router } = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const router = Router();

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'D&D 5e — Guia do Mestre API',
    version: '1.0.0',
    description: 'API baseada no conteúdo do livro D&D 5e — Guia do Mestre (Biblioteca Élfica)',
  },
  servers: [
    {
      url: '/',
      description: 'Base URL',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: [],
};

const swaggerSpec = swaggerJsdoc(options);

router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(swaggerSpec, { explorer: true }));

module.exports = router;
