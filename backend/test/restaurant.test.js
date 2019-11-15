const assert = require('assert');
const axios = require('axios');

const URL = 'http://localhost:3004';

const restaurant = {
  name: 'Pho Noodle House',
};

const badField = {
  name: '',
};

const headers = {
  Cookie: 'username=bob; password=123;',
};

describe('Restaurant API', () => {
  it('Post a new restaurant to the database', done => {
    axios
      .post(`${URL}/restaurant`, restaurant, headers)
      .then(res => {
        const id = res.data.id;
        deleteRestaurant(URL, id);
        assert.equal(restaurant.name, res.data.name);
        done();
      })
      .catch(err => {
        done(err);
      });
  });

  it('Failed to post a new restaurant to database with missing fields', done => {
    axios
      .post(`${URL}/restaurant`, badField)
      .then(res => {
        done('Should not have succeeded');
      })
      .catch(err => {
        console.log(err);
        done();
      });
  });
});

const deleteRestaurant = (URL, id) => {
  axios
    .delete(`${URL}/restaurant/${id}`, { headers })
    .then(res => {})
    .catch(err => {});
};
