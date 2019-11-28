// const mongoose = require('mongoose');
// const connect = require('../mongo/connect');

// /**
//  * Mocha -> Connect to mongo -> Success -> Run test
//  */

// beforeEach(function() {
//   const mongoUrl =
//     'mongodb+srv://john:123@cluster0-c6e3j.mongodb.net/test?retryWrites=true&w=majority';

//   /* * * * * * * * * * * *
//    * CONNECT TO DATABASE *
//    * * * * * * * * * * * */
//   connect(mongoUrl)
//     .then(async connection => {
//       console.log('Connected to database');
//     })
//     .catch(e => {
//       console.error(
//         '+_+_+_+_+ Failed to connect to database in registerService +_+_+_+_+',
//       );
//     });
// });

// // ES6 promise
// mongoose.Promise = global.Promise;

// // before(done => {
// //   mongoose.connect('mongodb://localhost:27018');
// //   mongoose.connection
// //     .once('open', () => {
// //       console.log('Connected test');
// //       done();
// //     })
// //     .on('error', error => {
// //       console.warn('Error: ', error);
// //       done(error);
// //     });
// // });

// // Empty database before each tests
// // beforeEach(done => {
// //   mongoose.connection.collections.test.drop(() => {
// //     console.log('dropped ----');
// //     // Done emptying so continue execution
// //     done();
// //   });
// // });
