const { connectToRabbitMQ } = require('../config/rabbitmq');
const sendEmail = require('../services/mailer');
const dotenv = require('dotenv');
dotenv.config();

const startConsumer = async () => {
  const channel = await connectToRabbitMQ();

  channel.consume(process.env.NOTIFICATION_QUEUE, async (msg) => {
    if (msg !== null) {
      try {
        const data = JSON.parse(msg.content.toString());

        console.log('📩 Received notification payload:', data);

        // Example email fields
        await sendEmail({
          to: data.email,
          subject: data.subject,
          text: data.message,
        });

        channel.ack(msg);
        console.log('✅ Email sent & message acknowledged');
      } catch (err) {
        console.error('❌ Error processing message:', err);
        channel.nack(msg); // requeue the message
      }
    }
  });
};

module.exports = startConsumer;