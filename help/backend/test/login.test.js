const assert = require('assert');
const axios = require('axios');

const URL = 'http://localhost:3004';

const goodUser = {
  username: 'bob',
  password: '123',
};

const badUser = {
  username: 'aklwdoahduobjkzvieb4oiwb',
  password: 'ioxfbhiodrgoihgej',
};

describe('Login user with body', () => {
  it('Successfully logs in user with good information', done => {
    axios
      .post(`${URL}/auth/login`, goodUser)
      .then(res => {
        assert.equal(true, res.data.valid);
        done();
      })
      .catch(err => {
        done(err);
      });
  });

  it('Fails to login user with bad information', done => {
    axios
      .post(`${URL}/auth/login`, badUser)
      .then(res => {
        assert.equal(false, res.data.valid);
        done();
      })
      .catch(err => {
        done(err);
      });
  });
});
