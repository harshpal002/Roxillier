const express = require('express');
const dotenv = require('dotenv');
const db = require('./models');
const authRoutes = require('./routes/auth.routes');
const storeRoutes = require('./routes/store.routes');

dotenv.config();
const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/stores', storeRoutes);

const PORT = process.env.PORT || 5000;

db.sequelize.sync({ alter: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});