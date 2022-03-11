'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transactions extends Model {

    static associate(models) {

      transactions.belongsTo(models.users, {
        as: "buyer",
        foreignKey: {
          name: "idBuyer"
        }
      })

      transactions.belongsTo(models.users, {
        as: "seller",
        foreignKey: {
          name: "idSeller"
        }
      })

      transactions.belongsToMany(models.products, {
        as: "products",
        through: {
          model: "categoryproduct",
          as: "bridge"
        },
        foreignKey: "idProduct"
      })

    }
  }
  transactions.init({
    idProduct: DataTypes.INTEGER,
    idBuyer: DataTypes.INTEGER,
    idSeller: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'transactions',
  });
  return transactions;
};