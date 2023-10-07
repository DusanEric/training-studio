'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TreningGrupas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Trenings,Treners,TreningStudios,PrijavaGrupes}) {
      // define association here

      this.belongsTo(Trenings, {
        foreignKey: "treningID",
      });
      this.belongsTo(Treners, {
        foreignKey: "trenerID",
      });
      this.belongsTo(TreningStudios, {
        foreignKey: "treningStudioID",
      });
      this.hasMany(PrijavaGrupes, {
        foreignKey: "treningGrupaID",
      });
    }
  }
  TreningGrupas.init({
    grupa: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
  }, {
    sequelize,
    modelName: 'TreningGrupas',
  });
  return TreningGrupas;
};