// const WebSocket = require('ws');
// const assert = require('assert');

// let player1, player2, player3, player4;
// player1 = new WebSocket('ws://localhost:4000');
// player2 = new WebSocket('ws://localhost:4000');
// player3 = new WebSocket('ws://localhost:4000');
// player4 = new WebSocket('ws://localhost:4000');

// describe('WebSocket', () => {
//   it('Gets right number of active users', done => {
//     before(() => {
//       console.log('done setup players');
//     });

//     player1.onmessage = message => {
//       const messageObject = JSON.parse(message.data);
//       switch (messageObject.type) {
//         case 'UPDATE_USER_COUNT':
//           assert(messageObject.count, 4);
//           done();
//           break;
//         default:
//           done(Error('Failed to get UPDATE_USER_COUNT'));
//           break;
//       }
//     };
//   });
// });
