const amqp = require('amqplib');
const dotenv = require('dotenv');
dotenv.config();

let channel;

const connectRabbit = async (queue) => {
  if (channel) return channel;

  const connection = await amqp.connect(process.env.RABBITMQ_URL);
  channel = await connection.createChannel();
  await channel.assertQueue(queue, { durable: true });

  return channel;
};

const publishToQueue = async (messageObj) => {
  try {
    const channel = await connectRabbit(messageObj.queueName);
    channel.sendToQueue(
      messageObj.queueName,
      Buffer.from(JSON.stringify(messageObj.payload)),
      { persistent: true }
    );
    console.log('📤 Message published to queue');
  } catch (err) {
    console.error('❌ Error sending to RabbitMQ:', err);
  }
};

module.exports = publishToQueue;