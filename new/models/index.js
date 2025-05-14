const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config').development;

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./user.model')(sequelize, DataTypes);
db.Store = require('./store.model')(sequelize, DataTypes);
db.Rating = require('./rating.model')(sequelize, DataTypes);

db.User.hasMany(db.Store);
db.Store.belongsTo(db.User);

db.User.hasMany(db.Rating);
db.Store.hasMany(db.Rating);
db.Rating.belongsTo(db.User);
db.Rating.belongsTo(db.Store);

module.exports = db;