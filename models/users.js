'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      users.hasOne(models.profile, {
        as: "profile",
        foreignKey: {
          name: 'idUser'
        }
      })

      users.hasMany(models.products, {
        as: 'products',
        foreignKey: {
          name: 'idUser'
        }
      })

      users.hasMany(models.transactions, {
        as: 'Buyer',
        foreignKey: {
          name: 'idBuyer'
        }
      })

      users.hasMany(models.transactions, {
        as: 'Seller',
        foreignKey: {
          name: 'idSeller'
        }
      })

    }
  }
  users.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};