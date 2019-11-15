const assert = require('assert');
const axios = require('axios');

const URL = 'http://localhost:3004';

const body = {
  username: 'testUser101',
  password: 'testPassword101',
  isBusiness: true,
};

const badBody = {
  username: 'bob',
  password: '123',
  isBusiness: true,
};

describe('Registers user', () => {
  it('Successfully registers user', done => {
    axios
      .post(`${URL}/register`, body)
      .then(res => {
        const id = res.data.id;
        deleteUser(URL, id);
        done();
      })
      .catch(err => {
        done('Failed to register. Perhaps the user already exists and is failing the test');
      });
  });

  it('Failed to register user if field is missing', done => {
    axios
      .post(`${URL}/register`, badBody)
      .then(res => {
        done('Successfully registered with invalid body or already existing user');
      })
      .catch(err => {
        done();
      });
  });
});

const deleteUser = (URL, id) => {
  axios
    .delete(`${URL}/user/${id}`, {
      headers: {
        Cookie: 'username=bob; password=123;',
      },
    })
    .then(res => {})
    .catch(err => {});
};
