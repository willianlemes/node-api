const User = require('../models/User');
const crypto = require('crypto');


module.exports = {
  async index(request, response ) {
    const { page = 1 } = request.query;
    const limit = 5;

    const count = await User.count({
      attributes: "id"
    });

    const users = await User.findAll({
      attributes: {
        exclude: ['password']
      },
      limit,
      offset: limit*(page-1),
      order: ["id"]
    });
    response.header('X-Total-Count',count);
    return response.json(users);
  },
  async create(request, response) {
    const { firstName, lastName, email, password } = request.body;

    userEmail = await User.findOne({ 
      attributes: ['email'],
      where: { email }
    });

    if(userEmail)
      return response.status(400).json({ error: "User already registered" }).send();

    const id = crypto.randomBytes(4).toString('HEX');
    const user = await User.create({ id, firstName, lastName, email, password });
    return response.json(user);        
  },
  async findById(request, response) {
    const { id } = request.params;
    const user  = await User.findByPk(id);
    return response.json(user);
  },
  async destroy(request, response) {
    const { id } = request.params;
    const user = await User.findByPk(id,{
      attributes: ["id"]
    });

    if (user.id != id) {      
      return response.status(400).json({ error: "User not found" }).send();
    }

    User.destroy({
      where: {
        id
      }
    });

    return response.sendStatus(204);
  },
  async update(request, response) {
    const { id, name, email } = request.body;
    const user = await User.findByPk(id, {
      attributes: ["id"]
    });

    if (!user) {
      return response.status(400).json({ error: "User not found" });
    }

    User.update({ id, name, email },{
      where: {
        id
      }
    });
    return response.sendStatus(200);
  }


};