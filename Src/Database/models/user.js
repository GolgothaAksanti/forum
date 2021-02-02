/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  /**
   * @class User
   */
  class User extends Model {
    /**
     * associate
     * @static
     * @param {*} models
     * @return {void}
     * @memberof User
     */
    static associate(models) {
      this.myAssociation = models.User.belongsTo(models.Post);
    }
  }

  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
    },
  );
  return User;
};
