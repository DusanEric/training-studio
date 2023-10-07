'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Treners extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({TreningGrupas}) {
      // define association here

      this.hasMany(TreningGrupas, {
        foreignKey: "trenerID",
      });
    }
  }
  Treners.init({
    ime: {
      type: DataTypes.STRING,
      allowNull: false
    },
    prezime: {
      type: DataTypes.STRING,
      allowNull: false
    },
    broj_telefona: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Treners',
  });
  return Treners;
};