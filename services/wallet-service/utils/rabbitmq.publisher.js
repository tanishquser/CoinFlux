const amqp = require('amqplib');
const dotenv = require('dotenv');
dotenv.config();

let channel;

const connectRabbit = async () => {
  if (channel) return channel;

  const connection = await amqp.connect(process.env.RABBITMQ_URL);
  channel = await connection.createChannel();
  await channel.assertQueue(process.env.NOTIFICATION_QUEUE, { durable: true });

  return channel;
};

const publishToQueue = async (messageObj) => {
  try {
    const channel = await connectRabbit();
    channel.sendToQueue(
      process.env.NOTIFICATION_QUEUE,
      Buffer.from(JSON.stringify(messageObj)),
      { persistent: true }
    );
    console.log('📤 Message published to queue');
  } catch (err) {
    console.error('❌ Error sending to RabbitMQ:', err);
  }
};

module.exports = publishToQueue;