var User = require('../models/user');
var Application = require('../models/application');
var db = require('secondthought');
var bcrypt = require('bcrypt-nodejs');
var Log = require('../models/log');
var assert = require('assert');

var RegResult = function() {
  var result = {
    success: false,
    message: null,
    user: null
  };
  return result;
};



var Registration = function(db) {
  var self = this;
  var validateInputs = function(app) {
    if(!app.email || !app.password) {
      app.setInvalid('Email and password are required');
    } else if (app.password !== app.confirm) {
      app.setInvalid('Passwords do not match');
    } else {
      app.validate();
    }
  };

  var checkIfUserExists = function(app, next) {
    db.user.exists({ email: app.email }, next);
  };

  var saveUser = function(user, next) {
    db.user.save(user, next);
  };

  var addLogEntry = function(user, next) {
    var log = new Log({
      subject: "Registration",
      entry: "Successfully Registration",
      userId: user.id
    });

    db.logs.save(log, next);
  };

  self.applyForMembership = function(args, next) {
    var regResult = new RegResult();
    var app = new Application(args);

    validateInputs(app);

    checkIfUserExists(app, function(err, exists) {
      assert.ok(err === null, err);
      if (!exists) {
        var user = new User(args);
        user.status = "approved";

        user.hashedPassword = bcrypt.hashSync(app.password);
        saveUser(user, function (err, newUser) {
          assert.ok(err === null, err);
          regResult.user = newUser;

          addLogEntry(newUser, function(err, newLog) {
            regResult.log = newLog;
            regResult.success = true;
            regResult.message = "Welcome!";
            next(null, regResult);
          });

        });

      }
    });
  };

  return self;
};


module.exports = Registration;
