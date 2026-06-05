const { z } = require('zod');

const validate = (schema) => {
  return (req, _res, next) => {
    try {
      const parsed = schema.parse(req.body);
      req.body = parsed;
      next();
    } catch (err) {
      if (err instanceof z.ZodError) {
        const error = new Error('Validation error');
        error.statusCode = 400;
        error.errors = err.errors.map((e) => ({
          field: e.path.join('.'),
          message: e.message,
        }));
        next(error);
      } else {
        next(err);
      }
    }
  };
};

const validateQuery = (schema) => {
  return (req, _res, next) => {
    try {
      const parsed = schema.parse(req.query);
      req.query = parsed;
      next();
    } catch (err) {
      if (err instanceof z.ZodError) {
        const error = new Error('Validation error');
        error.statusCode = 400;
        error.errors = err.errors.map((e) => ({
          field: e.path.join('.'),
          message: e.message,
        }));
        next(error);
      } else {
        next(err);
      }
    }
  };
};

module.exports = { validate, validateQuery };
