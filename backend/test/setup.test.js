const mongoose = require('mongoose');

/**
 * Mocha -> Connect to mongo -> Success -> Run test
 */

// ES6 promise
mongoose.Promise = global.Promise;

// before(done => {
//   mongoose.connect('mongodb://localhost:27018');
//   mongoose.connection
//     .once('open', () => {
//       console.log('Connected test');
//       done();
//     })
//     .on('error', error => {
//       console.warn('Error: ', error);
//       done(error);
//     });
// });

// Empty database before each tests
// beforeEach(done => {
//   mongoose.connection.collections.test.drop(() => {
//     console.log('dropped ----');
//     // Done emptying so continue execution
//     done();
//   });
// });
