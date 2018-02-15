'use strict';
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res) {
    //res.render('user');
    //res.send('respond with a resource');
    res.json([{
        id: 1,
        username: "j'ai pris de mon api"
    }, {
        id: 2,
        username: "yesssss"
    }]);
});

router.post('/', function (req, res) {
    console.log(req.body);
    var lol = [{ user: req.body[0].user+ " je confirme", pass:req.body[0].pass}];
    console.log(lol);
    res.json(lol);

});
module.exports = router;
