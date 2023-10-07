'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Clans extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Placanjes,PrijavaGrupes}) {
      // define association here

      this.hasMany(Placanjes, {
        foreignKey: "clanID",onDelete: 'cascade'
      });
      this.hasMany(PrijavaGrupes, {
        foreignKey: "clanID",onDelete: 'cascade',
      });
    }
  }
  Clans.init({
    ime: {
      type: DataTypes.STRING,
      allowNull: false
    },
    prezime: {
      type: DataTypes.STRING,
      allowNull: false
    },
    broj_telefona: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    },
  }, {
    sequelize,
    modelName: 'Clans',
  });
  return Clans;
};