var amqp = require('amqplib/callback_api');

var args = process.argv.slice(2);
console.log('args: ', args);

amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel((err, ch) => {
    var queue = 'first-queue';
    var exchange = 'first-exchange';

    ch.assertExchange(exchange, 'direct', { durable: false });
    ch.assertQueue(queue, { durable: false });
    console.log('waiting for message in: ', queue);
    ch.consume(queue, (message) => {
      console.log('Received: ', message.fields.routingKey, message.content.toString());
    }, { noAck: true });
  });
});
