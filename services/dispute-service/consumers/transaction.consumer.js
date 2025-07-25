const amqp = require("amqplib");
const Dispute = require("../models/dispute.model");

const startConsumer = async () => {
  const connection = await amqp.connect(process.env.RABBITMQ_URL);
  const channel = await connection.createChannel();
  await channel.assertQueue(process.env.DISPUTE_QUEUE);

  channel.consume(process.env.DISPUTE_QUEUE, async (msg) => {
    if (!msg) return;
    const data = JSON.parse(msg.content.toString());
    console.log("📩 Dispute Service received event:", data);

    if (data.type === "TRANSACTION_FAILED") {
      // simulate auto-dispute for failed transactions
      await Dispute.create({
        userId: data.userId,
        transactionId: data.transactionId,
        reason: "Auto-dispute: transaction failed",
      });
    }

    channel.ack(msg);
  });
};

module.exports = startConsumer;