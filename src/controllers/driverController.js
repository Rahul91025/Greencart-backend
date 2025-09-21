const Driver = require("../models/Driver");

// Get all drivers
exports.getDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find();
    res.status(200).json(drivers); 
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create driver
exports.createDriver = async (req, res) => {
  try {
    const driver = await Driver.create(req.body);
    res.status(201).json(driver);
  } catch (error) {
    
    let message = error.message;
    if (error.code === 11000) {
      message = `Duplicate field value entered: ${JSON.stringify(error.keyValue)}`;
    }
    res.status(400).json({ success: false, message });
  }
};

// Update driver
exports.updateDriver = async (req, res) => {
  try {
    const driver = await Driver.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!driver) return res.status(404).json({ success: false, message: "Driver not found" });
    res.status(200).json(driver);
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete driver
exports.deleteDriver = async (req, res) => {
  try {
    const driver = await Driver.findByIdAndDelete(req.params.id);
    if (!driver) return res.status(404).json({ success: false, message: "Driver not found" });
    res.status(200).json({ success: true, message: "Driver deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
