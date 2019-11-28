// const assert = require('assert');
// const axios = require('axios');
// const Note = require('../note/note.model');

// const text = 'I am adwadthe new njbjhgjgjote';

// const bodyWithAuth = {
//   text,
//   username: 'abc',
//   password: '123',
// };

// const bodyWithoutAuth = { text };

// describe('Posting notes', () => {
//   it('Succeeds post with auth', done => {
//     axios
//       .post('http://localhost:3004/notes', bodyWithAuth)
//       .then(res => {
//         done();
//       })
//       .catch(err => {
//         done(err);
//       });
//   });

//   it('Returns posted note with correct text', done => {
//     axios
//       .post('http://localhost:3004/notes', bodyWithAuth)
//       .then(res => {
//         assert.equal(res.data.notes.text, text);
//         done();
//       })
//       .catch(err => {
//         done(err);
//       });
//   });

//   it('Fails to post without auth', done => {
//     axios
//       .post('http://localhost:3004/notes', bodyWithoutAuth)
//       .then(res => {
//         done(Error('Succeeds with bad auth'));
//       })
//       .catch(err => {
//         done();
//       });
//   });
// });

// describe('Deleting notes', () => {
//   it('Successfully deletes a note while auth', done => {
//     let _id;
//     axios
//       .post('http://localhost:3004/notes', bodyWithAuth)
//       .then(res => {
//         _id = res.data.notes._id;

//         axios
//           .delete(`http://localhost:3004/notes/${_id}`, { data: bodyWithAuth })
//           .then(resInner => {
//             assert(resInner.data.notes.text, text);
//             done();
//           })
//           .catch(err => done(err));
//       })
//       .catch(err => {
//         done(Error('Deleting notes failed to post'));
//       });
//   });

//   it('Fails to delete a note while not auth', done => {
//     let _id;
//     axios
//       .post('http://localhost:3004/notes', bodyWithAuth)
//       .then(res => {
//         _id = res.data.notes._id;

//         axios
//           .delete(`http://localhost:3004/notes/${_id}`, {
//             data: bodyWithoutAuth,
//           })
//           .then(resInner => {
//             assert(resInner.data.notes.text, text);
//             done(Error('Passed deleting with bad auth'));
//           })
//           .catch(err => done());
//       })
//       .catch(err => {
//         done(Error('Deleting notes failed to post'));
//       });
//   });
// });

// describe('Editing Note', () => {
//   it('Successfully edits a note with authorization', done => {
//     let _id;
//     axios
//       .post('http://localhost:3004/notes', {
//         ...bodyWithAuth,
//         text: 'before',
//       })
//       .then(res => {
//         _id = res.data.notes._id;

//         axios
//           .put(`http://localhost:3004/notes/${_id}`, {
//             ...bodyWithAuth,
//             text: 'after',
//           })
//           .then(resInner => {
//             assert(resInner.data.notes.text, 'after');
//             done();
//           })
//           .catch(err => done(err));
//       })
//       .catch(err => {
//         done(Error('Deleting notes failed to post'));
//       });
//   });
// });
