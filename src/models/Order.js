const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  address: { type: String, required: true },
  value: { type: Number, required: true },
  estimatedTime: { type: Number, required: true },
  status: { type: String, enum: ["pending", "delivered", "late"], default: "pending" },
  assignedDriver: { type: mongoose.Schema.Types.ObjectId, ref: "Driver" },
});

module.exports = mongoose.model("Order", orderSchema);
