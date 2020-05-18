const router = require('express').Router();
const bcrypt = require('bcryptjs');
const Users = require("../users/users-model.js");
const authenticate = require('../auth/authenticate-middleware.js');

router.post('/register', async (req, res, next) => {
  
  try {

    const {username} = req.body
    const user = await Users.findBy({username}).first()

    if(user) {
      res.status(409).json({"message": "Username is already taken"})
    } else {
              const payload = {
                                  username:req.body.username,
                                  password:req.body.password
                              }          
              const user = await Users.register(payload);
              return res.status(201).json(user);
    }
   
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

router.get("/logout", authenticate, (req, res, next) => {
	// this will delete the session in the database and try to expire the cookie,
	// though it's ultimately up to the client if they delete the cookie or not.
	// but it becomes useless to them once the session is deleted server-side.
	req.session.destroy((err) => {
		if (err) {
			next(err)
		} else {
			res.json({
				message: "Successfully logged out",
			})
		}
	})
})

module.exports = router;
