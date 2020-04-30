const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
  async encryptPassword(password, salt = saltRounds) {

    

    const pass = await bcrypt.hash(password, saltRounds)
    .then( (passHashed) => passHashed);

    return pass;
    
    


  }
};


