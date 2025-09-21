const mongoose = require("mongoose");

const simulationResultSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  drivers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Driver" }],
  totalProfit: { type: Number, default: 0 },
  efficiencyScore: { type: Number, default: 0 },
  fuelCost: { type: Number, default: 0 },
  totalDeliveries: { type: Number, default: 0 },
  onTimeDeliveries: { type: Number, default: 0 },
});

module.exports = mongoose.model("SimulationResult", simulationResultSchema);
