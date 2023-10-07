'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cenovniks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Placanjes,Trenings}) {
      // define association here

      this.hasMany(Placanjes, {
        foreignKey: "cenovnikID",
      });
      this.belongsTo(Trenings, {
        foreignKey: "treningID",
      });
    }
  }
  Cenovniks.init({
    cena: {
      type: DataTypes.INTEGER,
      unique:true,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Cenovniks',
  });
  return Cenovniks;
};