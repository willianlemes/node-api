const { Model, DataTypes } = require('sequelize');
const helper = require('../helpers');

class User extends Model {
  static init(connection) {
    super.init({
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,      
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    }, {
      sequelize: connection
    });
  }

  static async create(user) {
    const { password } = user;
    const passwordHash = await helper.encryptPassword(password);
    user.password = passwordHash;
    return super.create(user);  
  }

}

module.exports = User;

