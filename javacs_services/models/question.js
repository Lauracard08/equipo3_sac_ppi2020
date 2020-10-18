'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  question.init({
    pregunta: DataTypes.STRING,
    respuestas: DataTypes.STRING,
    respuesta: DataTypes.STRING,
    categoria: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'question',
  });
  return question;
};