const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const User = require('./user')(sequelize, Sequelize);
const Authentication = require('./authentication')(sequelize, Sequelize);
const Address = require('./address')(sequelize, Sequelize);

User.hasMany(Address, { foreignKey: 'userId', as: 'addresses' });
User.belongsTo(Authentication, { foreignKey: 'authId', as: 'authentication' });
Address.belongsTo(User, { foreignKey: 'userId', as: 'user' });

sequelize.sync();

module.exports = {
    User,
    Authentication,
    Address
};
