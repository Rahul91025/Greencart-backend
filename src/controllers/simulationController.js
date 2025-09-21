const SimulationResult = require("../models/SimulationResult");

// Run a simulation
const runSimulation = async (req, res) => {
  try {
    const { driverIds } = req.body;

    if (!driverIds || driverIds.length === 0) {
      return res.status(400).json({ message: "No drivers selected" });
    }

    // simulation logic
    const totalDeliveries = driverIds.length * 10;
    const onTimeDeliveries = Math.floor(totalDeliveries * 0.85);
    const totalProfit = 5000;
    const fuelCost = 1200;
    const efficiencyScore = Math.round((onTimeDeliveries / totalDeliveries) * 100);

    const result = await SimulationResult.create({
      drivers: driverIds,
      totalDeliveries,
      onTimeDeliveries,
      totalProfit,
      fuelCost,
      efficiencyScore,
    });

    res.status(200).json({ message: "Simulation completed", result });
  } catch (err) {
    console.error("Simulation error:", err);
    res.status(500).json({ message: "Simulation failed", error: err.message });
  }
};

// Get all simulations
const getAllSimulations = async (req, res) => {
  try {
    const simulations = await SimulationResult.find()
      .populate("drivers", "name email");
    res.status(200).json(simulations);
  } catch (err) {
    console.error("Fetch simulations error:", err);
    res.status(500).json({ message: "Failed to fetch simulations", error: err.message });
  }
};

module.exports = { runSimulation, getAllSimulations };
