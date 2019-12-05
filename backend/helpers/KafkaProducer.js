const kafka = require('kafka-node');
const HighLevelProducer = kafka.HighLevelProducer;
const Client = kafka.KafkaClient;

class KafkaProducer {
  // Topic is where this producer is writing to
  // Creates if topic doesnt exist
  constructor(topic) {
    this.topic = topic;
    this.producer = null;
  }

  connect(callback) {
    const client = new Client({ kafkaHost: 'kafka:9092' });
    this.producer = new HighLevelProducer(client);
    //console.log(this.producer);

    // This callback isnt true since it doesn't actually connect asyncly
    callback();
  }

  send(message) {
    if (!this.producer) return;
    this.producer.send([{ topic: this.topic, messages: [JSON.stringify(message)] }], err => {
      if (err) {
        console.error('KAFKA SEND FAILED');
        console.log(err);
      }
    });
  }
}

module.exports = KafkaProducer;
