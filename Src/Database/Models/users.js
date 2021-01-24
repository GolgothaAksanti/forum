/* eslint-disable valid-jsdoc */
/** @file Users.js sequelize class model for users */
import sequelize from 'sequelize';

/* eslint operator-linebreak: ["error", "after"] */
module.exports =
  /** @class Users  */
  class Users extends sequelize.Model {
    /**
     *  @function init - initialization the fields
     * @param {*} Sequelize - the sequelize instance
     */
    static init(Sequelize) {
      return super.init(
        {
          username: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          email: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          password: {
            type: Sequelize.STRING,
            allowNull: false,
          },
        },
        {
          sequelize,
          modelName: 'Users',
        },
      );
    }

    /** @function associate associate the models */
    static associate(models) {
      /** define association here */
      this.myAssociation = this.models.hasMany(models.Post);
    }
  };
