'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lokacijas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({TreningStudios}) {
      // define association here

      this.hasMany(TreningStudios, {
        foreignKey: "lokacijaID",onDelete: 'cascade'
      });
    }
  }
  Lokacijas.init({
    lokacija: {
      type: DataTypes.STRING,
      unique:true,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Lokacijas',
  });
  return Lokacijas;
};