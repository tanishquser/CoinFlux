const amqp = require('amqplib');
const dotenv = require('dotenv');
dotenv.config();

let channel = null;

const connectToRabbitMQ = async (retries = 7, delay = 5000) => {
  while (retries > 0) {
    try {
      const connection = await amqp.connect(process.env.RABBITMQ_URL);
      channel = await connection.createChannel();
      await channel.assertQueue(process.env.QUEUE_NAME, { durable: true });

      console.log('📬 Connected to RabbitMQ');
      return channel;
    } catch (err) {
      console.error(`❌ Failed to connect to RabbitMQ. Retries left: ${retries - 1}`);
      retries--;
      await new Promise(res => setTimeout(res, delay));
    }
  }

  process.exit(1);
};

module.exports = {
  connectToRabbitMQ,
  getChannel: () => channel,
};