const express = require("express");
const router = express.Router();

// app.use(express.static('public'));
// get Homepage
router.get('/', (req, res)=>{
    res.render('index', {title: 'Login'});
});

module.exports = router;