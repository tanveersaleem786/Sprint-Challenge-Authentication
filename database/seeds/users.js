

exports.seed = async function(knex) {    
  await knex("sessions").truncate()
  await knex("users").truncate()    
};
