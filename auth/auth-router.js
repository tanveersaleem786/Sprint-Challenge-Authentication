const router = require('express').Router();
const bcrypt = require('bcryptjs');
const Users = require("../users/users-model.js");

router.post('/register', async (req, res, next) => {
  
  try {
    
    const payload = {
      username: req.body.username
    }
   
    payload.password = await bcrypt.hashSync(req.body.password, 8);
   
   const user = await Users.register(payload);
   return res.status(201).json(user);
   
  } catch(err) {
    next(err);
  }
});

router.post('/login', async (req, res, next) => {
  
  try {
  
    const authError = {
      message:"Incorrect credentials"
    }

    const {username, password} = req.body;

    const [user] = await Users.findBy({username});

    if(!user) {
      return res.status(401).json(authError);
    }

    if(!bcrypt.compareSync(password, user.password)) {
      return res.status(401).json(authError);
    }

    req.session.username = username;
    return res.status(200).json({ message: `Welcome ${user.username}!` })
  
  } catch(err) {
    next(err);
  }

});

module.exports = router;
