const { DataTypes } = require('sequelize');
const { db } = require('../database/config');
const bycrypt = require('bcryptjs');

const User = db.define(
  'users',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('client', 'employee'),
      allowNull: false,
      defaultValue: 'client',
    },
    status: {
      type: DataTypes.ENUM('available', 'disabled'),
      allowNull: false,
      defaultValue: 'available',
    },
  },
  {
    // Antes de crear un usuario generr el
    hooks: {
      beforeCreate: async (user) => {
        const salt = await bycrypt.genSalt(10);
        const secretPassword = await bycrypt.hash(user.password, salt);
        user.password = secretPassword;
      },
    },
  }
);

module.exports = User;
