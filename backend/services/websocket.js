const WebSocket = require('ws');
const redis = require('redis');

const redisOptions = {
  host: process.env.REDISHOST || 'localhost',
  port: process.env.PORT || 6379,
};

const client = redis.createClient(redisOptions);

const wss = new WebSocket.Server({ port: 3027 });

wss.on('connection', ws => {
  console.log('********************************');
  console.log('Someone connected to web socket');
  console.log('********************************');
});

client.on('message', (channel, message) => {
  console.log('********************************');
  console.log('Subscriber hears message: ');
  console.log(JSON.stringify(message));
  wss.clients.forEach(client => {
    client.send(message);
  });
});

// Subscribe to Redis, redis sends messages
client.subscribe('updateRestaurant');
