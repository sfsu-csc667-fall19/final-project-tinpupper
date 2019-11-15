// const WebSocket = require('ws');

// const wss = new WebSocket.Server({ port: 4000 });

// console.log('websocket activated');

// // Should be in mongodb
// const notes = [];

// const broadcastMessage = message => {
//   //
//   wss.clients.forEach(client => {
//     if (client.readyState === WebSocket.OPEN) {
//       // Sends data from server to client
//       client.send(JSON.stringify(message));
//     }
//   });
// };

// // Boardcase type and count to all users
// const updateUserCount = () => {
//   broadcastMessage({
//     type: 'UPDATE_USER_COUNT',
//     count: wss.clients.size,
//   });
// };

// //
// const broadcastAllMessages = newNote => {
//   notes.unshift(newNote); // reverse order

//   broadcastMessage({
//     type: 'UPDATE_MESSAGES',
//     notes,
//   });
// };

// // Runs when someone connects to server
// // 'wss' respresents the entire server
// wss.on('connection', ws => {
//   // 'ws' is a reference to a single client
//   console.log('Someone has connected');
//   //  broadcastMessage('someone has connected!');
//   updateUserCount();

//   // Whoever came in later gets all recent updated messages
//   ws.send(
//     JSON.stringify({
//       type: 'UPDATE_MESSAGES',
//       notes,
//     }),
//   );

//   // Called from Home.js (text box)
//   ws.on('message', message => {
//     const messageObject = JSON.parse(message);
//     console.log(messageObject);
//     switch (messageObject.type) {
//       case 'SEND_MESSAGE':
//         broadcastAllMessages(messageObject.newNote);
//         break;
//       default:
//         break;
//     }
//     // console.log(message);
//   });

//   // Page closes
//   ws.on('close', () => {
//     broadcastMessage('someone has disconnected!');
//     console.log('someone has disconnected!');
//   });

//   ws.on('error', e => {
//     console.log(e);
//   });
// });

// module.exports = this;
