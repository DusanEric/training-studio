'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PrijavaGrupes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Clans,Administrators,TreningGrupas}) {
      // define association here

      this.belongsTo(Clans, {
        foreignKey: "clanID",
      });
      this.belongsTo(TreningGrupas, {
        foreignKey: "treningGrupaID",
      });
    }
  }
  PrijavaGrupes.init({
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: true
      },
  }, {
    sequelize,
    modelName: 'PrijavaGrupes',
  });
  return PrijavaGrupes;
};