const express = require('express');
const router = express.Router();
const userController = require('../controller/usercontroller');


/* GET users listing. */
// router for users
router.route('/users')
.get(userController.getAll)
.delete(userController.deleteAll);

router.post('/users/register',userController.Register);
router.route('/users/login')
.post(userController.login);    

// router für eizelnen user
router.route('/users/:username')
.get(userController.getUserById)
.put(userController.updateUserByUsername)
.delete(userController.deleteUserByUsername);

module.exports = router;
