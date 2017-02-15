var assert = require('assert');

var User = function(args) {
  assert.ok(args.email, "Email is required");
  var user = {};

  user.email = args.email;
  user.authenticationToken = 'oiasdoaps123123fdmoafnoi12938890123n';
  user.createdAt = args.createdAt || new Date();
  user.status = args.status || 'pending';
  user.signInCount = args.signInCount || 0;
  user.lastLogin = args.lastLogin || new Date();
  user.currentLoginAt = args.currentLoginAt || new Date();

  return user;
};

module.exports = User;
