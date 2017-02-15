const should = require('should');
const User = require('../models/user');

describe("User", () => {
  describe('defaults', () => {
    let user = {};
    before(() => {
      user = new User({ email: 'iwilsonq@gmail.com' });
    });

    it('email is iwilsonq@gmail.com', () => {
      user.email.should.equal('iwilsonq@gmail.com');
    });
    it('has an authentication token', () => {
      user.authenticationToken.should.be.defined;
    });
    it('has a pending status', () => {
      user.status.should.equal('pending');
    });
    it('has a created date', () => {
      user.createdAt.should.be.defined;
    })
    it('has a signInCount of 0', () => {
      user.signInCount.should.equal(0);
    });
    it('has lastLogin', () => {
      user.lastLogin.should.be.defined;
    });
    it('has currentLogin', () => {
      user.currentLoginAt.should.be.defined;
    });
  });
});
