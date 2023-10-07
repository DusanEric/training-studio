'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Trenings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Cenovniks,TreningGrupas}) {
      // define association here

      this.hasMany(Cenovniks, {
        foreignKey: "treningID",onDelete: 'cascade'
      });
      this.hasMany(TreningGrupas,{
        foreignKey: "treningID", onDelete: 'cascade'
      })
    }
  }
  Trenings.init({
    tip: {
      type: DataTypes.STRING,
      unique:true,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Trenings',
  });
  return Trenings;
};