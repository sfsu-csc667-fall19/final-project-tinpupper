const ConsumerGroup = require('kafka-node').ConsumerGroup;
const EventEmitter = require('events');

const consumerOptions = {
  kafkaHost: 'kafka:9092',
  groupId: Date.now().toString(),
  sessionTimeout: 25000,
  protocol: ['roundrobin'],
  //   fromOffset: 'latest', // Pick latest messages from queue; latest is default
};

class KafkaConsumer extends EventEmitter {
  constructor(topics) {
    super();
    if (Array.isArray(topics)) {
      this.topics = topics;
    } else {
      this.topics = [topics]; // Array since ConsumerGroup accepts an array
    }
    this.consumerGroup = null;
  }

  connect() {
    // ID is useless? not in documentation
    this.consumerGroup = new ConsumerGroup(Object.assign({ id: 'test1' }, consumerOptions), this.topics);

    // On for Kafka vs On for EventEmitter
    this.consumerGroup.on('message', message => this.emit('message', message));
  }
}

module.exports = KafkaConsumer;
