const Repair = require('./repair.model');
const User = require('./user.model');

const initModel = () => {
  User.hasMany(Repair, { foreignKey: 'userId' });
  Repair.belongsTo(User, { foreignKey: 'userId' });
};

module.exports = initModel;
