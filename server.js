require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { errorHandler } = require('./middleware/errorHandler');
const healthRoutes = require('./routes/health');
const docsRoutes = require('./routes/docs');
const deitiesRoutes = require('./routes/deities');
const planesRoutes = require('./routes/planes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/health', healthRoutes);
app.use('/api/docs', docsRoutes);
app.use('/api/deities', deitiesRoutes);
app.use('/api/planes', planesRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
