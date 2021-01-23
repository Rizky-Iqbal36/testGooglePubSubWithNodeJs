'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class yeartable extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  yeartable.init({
    yearCol: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'yeartable',
  });
  return yeartable;
};