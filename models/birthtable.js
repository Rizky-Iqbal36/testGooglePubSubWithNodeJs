'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class birthtable extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  birthtable.init({
    birthCol: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'birthtable',
  });
  return birthtable;
};