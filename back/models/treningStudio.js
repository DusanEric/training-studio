'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TreningStudios extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({TreningGrupas,Lokacijas}) {
      // define association here

      this.hasMany(TreningGrupas, {
        foreignKey: "treningStudioID", onDelete: 'cascade'
      });
      this.belongsTo(Lokacijas, {
        foreignKey: "lokacijaID",
      });
    }
  }
  TreningStudios.init({
    naziv: {
      type: DataTypes.STRING,
      unique:true,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'TreningStudios',
  });
  return TreningStudios;
};