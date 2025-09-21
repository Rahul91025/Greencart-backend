const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, sparse: true }, 
  phone: { type: String, unique: true, sparse: true },
  maxHoursPerDay: { type: Number, default: 8 },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model("Driver", driverSchema);
