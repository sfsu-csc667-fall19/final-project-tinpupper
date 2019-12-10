const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 4001 });
const businesses = [];

const broadcastMessage = message => {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message)); // server to client
    }
  });
};

const broadcastAllMessages = newBusiness => {
  // Use type because there is no routing. Every object goes through a single connection.
  businesses.unshift(newBusiness);
  broadcastMessage({
    type: "UPDATE_MESSAGES",
    businesses
  });
};

wss.on("connection", ws => {
  console.log("Someone has connected");
  // broadcastMessage("someone has connected!");
  ws.send(
    JSON.stringify({
      type: "UPDATE_BUSINESS",
      businesses,
    })
  );

  ws.on("message", message => {
    const messageObject = JSON.parse(message);
    switch (messageObject.type) {
      case "SEND_MESSAGE":
        broadcastAllMessages(messageObject.newBusiness);
        break;
    }

    console.log(message);
  });

  ws.on("close", () => {
    // broadcastMessage("someone has disconnected!");
    console.log("someone has disconnected!");
  });

  ws.on("error", e => {
    console.log(e);
  });
});
