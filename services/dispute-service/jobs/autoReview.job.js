const { Op } = require("sequelize");
const Dispute = require("../models/dispute.model");

const autoReviewDisputes = async () => {
  try {
    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);

    const disputes = await Dispute.findAll({
      where: {
        status: "pending",
        createdAt: { [Op.lte]: tenMinutesAgo },
      },
    });

    for (const dispute of disputes) {
      dispute.status = "in_review";
      await dispute.save();
      console.log(`🔄 Auto-reviewed dispute ID: ${dispute.id}`);
    }
  } catch (err) {
    console.error("❌ Auto-review job failed:", err.message);
  }
};

module.exports = autoReviewDisputes;