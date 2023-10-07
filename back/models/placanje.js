'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Placanjes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Cenovniks,Clans}) {
      // define association here

      this.belongsTo(Cenovniks, {
        foreignKey: "cenovnikID",
      });
      this.belongsTo(Clans, {
        foreignKey: "clanID",
      });
    }
  }
  Placanjes.init({
    iznos: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    racun: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Placanjes',
  });
  return Placanjes;
};