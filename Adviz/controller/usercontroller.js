const User = require('../models/usermodel');

const userModel = User.db.collection('users');

const login = async (req, res) => {
	// Ensure the input fields exists and are not empty
		if (req.body.username && req.body.password) {
			const user = userModel.findOne({username: req.body.username}, async (err, result) => {
				if (err) throw err;
				console.log(result);
				if (!result) {
					return res.status(404).send('cannot find user');
				}
				try {
					const auth = await result.username === req.body.username && result.password === req.body.password;
					if (auth) {			
						return res.send(result);	
					}else{
						return res.status(401).send('username or password is incorrect!, please try again!');
					}
				} catch{
					return res.status(500).send('Internal Server Error');
				}
			});
			
		} else {
			return res.status(401).send('Please enter Username and Password!');
		}
}

const Register = (req, res) => {
	// check if user exists
	userModel.findOne({username: req.body.username}, async (err, existingUser) => {
	  if (err) throw err;
	  console.log(existingUser);
	  if (existingUser) {
		return res.status(422).send({
			error: 'User already exists.'
		});
	  }else{
		// in the else condition, the email does not exist before in db, then create the user
		const queryUser = {
		username: req.body.username,
		password: req.body.password,
		role: req.body.role,
		};
		const newUser = new User(queryUser);
		newUser.save();
		res.send(newUser);
	  }
	});
}

const getUserById = (req, res) => {
	userModel.findOne({username: req.params.username}, (err, result) => {
	  if (err) throw err;
	  if (!result) {
		return res.status(400).send("no user exists!");
	  }else {
		res.send(result);
	  }
	});
}

const updateUserByUsername = (req, res) => {
	// update data in body
	const replacement = {
	  username: req.params.username,
	  password: req.body.password,
	  role: req.body.role,
	
	};
	// check if the user exists
	userModel.findOneAndReplace({username: req.params.username}, replacement, (err, result) => { 
	  if (err) throw err;
	  console.log(result);
	  if (result.lastErrorObject.n === 0){
		return res.status(404).send({message: 'User not found!'});
	  }else{
		res.send(result);
	  }
	});
}

const deleteUserByUsername = (req, res) => {
	// check if username is already in the database
	// delete the user model
	userModel.findOneAndDelete({username: req.params.username}, (err, result) => {
	  if (err) throw err;
	  if(result.lastErrorObject.n === 0){
		return res.status(404).send({message: 'User not found!'});
	  }
	  res.send(result);
	});
}

const deleteAll = (req, res) => {
	userModel.deleteMany({}, (err, result) => {
	  if (err) throw err;
	  res.send("all user is deleted!");
	});
}

const getAll = (req, res) => {
	userModel.find({}).toArray( function(err, result) {
	  if (err) throw err;
	  res.send(result);
	});
}

module.exports = {
    login,Register, getUserById, updateUserByUsername,
	deleteUserByUsername, deleteAll, getAll

}