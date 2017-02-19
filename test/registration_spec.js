var Registration = require('../lib/registration');
var db = require('secondthought');

describe('Registration', () => {

  var reg = {};
  before(function(done) {
    db.connect({db: 'membership'}, function(err, db) {
      reg = new Registration(db);
      done();
    })
  });

  describe('a valid application', () => {
    var regResult = {};
    before(done => {
      db.user.destroyAll(function(err, result) {
        regResult = reg.applyForMembership({
          email: 'iwilsonq@gmail.com',
          password: '123',
          confirm: '123'
        }, function(err, result) {
          regResult = result;
          done();
        });
      })
    });

    it('is a success', () => {
      regResult.success.should.equal(true);
    });
    it('creates a user', () => {
      regResult.user.should.be.defined;
    });
    it('creates a log entry', () => {
      regResult.log.should.be.defined;
    });
    it('sets the user\'s status to approved', () => {
      regResult.user.status.should.equal("approved");
    });
    it('offers a welcome message', () => {
      regResult.message.should.equal("Welcome!");
    });
    it('increments the sign in count', () => {
      regResult.user.signInCount.should.equal(1);
    });
  });
  describe('an empty or null email', () => {
    it('is not successful');
    it('tells user that email is required');
  });
  describe('empty or null password', () => {
    it('is not successful');
    it('tells user that password is required');
  });
  describe('password and confirm mismatch', () => {
    it('is not successful');
    it('tells user that passwords don\'t match');
  });
  describe('email already exists', () => {
    it('is not successful');
    it('tells user that email already exists');
  });
})
