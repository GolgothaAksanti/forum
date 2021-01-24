/* eslint-disable valid-jsdoc */
/** @file Users.js sequelize class model for users */
import Sequelize from 'sequelize';

/* eslint operator-linebreak: ["error", "after"] */
module.exports =
  /** @class Users  */
  class Post extends Sequelize.Model {
    /**
     *  @function init - initialization the fields
     * @param {*} sequelize - the sequelize instance
     */
    static init(sequelize) {
      return super.init(
        {
          userId: {
            type: sequelize.NUMBER,
            allowNull: false,
            foreignKey: true
          },
          title: {
            type: sequelize.STRING,
            allowNull: false,
          },
          description: {
            type: sequelize.STRING,
            allowNull: false,
          },
        },
        {
          sequelize,
          modelName: 'Post',
        },
      );
    }

    /** @function associate associate the models */
    static associate(models) {
      /** define association here */
      this.myAssociation = this.models.hasOne(models.Users);
    }
  };
