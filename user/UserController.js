// UserController.js

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

var User = require('./User');

// Creates a new user
router.post('/', function(req, res) {
    User.create({
        name : req.body.name,
        email : req.body.email,
        password : req.body.password
    },
    function(err, user) {
        if(err) return res.status(500).send("There was a problem adding the information to the database.");
        res.status(200).send(user);
    });
});

// Gets all the users from the database
router.get('/', function(req, res) {
    User.find({}, function(err, users) {
        if(err) return res.status(500).send("There was a problem finding the users.");
        res.status(200).send(users);
    });
});

// Gets a single user from the database
router.get('/:id', function(req, res) {
    User.findById(req.params.id, function(err, user) {
        if(err) return res.status(500).send("There was a problem finding the user.");
        if(!user) return res.status(404).send("No user was found.");
        res.status(200).send(user);
    });
});

// Deletes a user from the database
router.delete('/:id', function(req, res) {
    User.findByIdAndRemove(req.params.id, function(err, user) {
        if(err) return res.status(500).send("There was a problem deleting the user.");
        res.status(200).send("User " + user.name + " was deleted.");
    });
});

// Updates a user from the database
router.put('/:id', function(req, res) {
    User.findByIdAndUpdate(req.params.id, req.body, {new: true}, 
    function(err, user) {
        if(err) return res.status(500).send("There was a problem updating the user.");
        res.status(200).send(user);
    });
});

module.exports = router;
