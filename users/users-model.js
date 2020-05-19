const bcrypt = require('bcryptjs');
const db = require('../database/dbConfig.js');

async function register(user) {
   user.password = await bcrypt.hashSync(user.password, 8);
   const [id] = await db("users").insert(user);
   return findById(id);
}

function findBy(filter)
{
    return db("users").where(filter);
}

function findById(id)
{
    return db("users").where({id}).first();
}

module.exports = {
    register,
    findBy
}