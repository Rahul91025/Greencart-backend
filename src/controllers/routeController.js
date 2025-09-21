const Route = require("../models/Route");

// Get all routes
exports.getRoutes = async (req, res) => {
  try {
    const routes = await Route.find();
    res.json(routes);
  } catch (err) {
    console.error("Get routes error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Create route
exports.createRoute = async (req, res) => {
  try {
    const { route_id, distance_km, traffic_level, base_time_min } = req.body;

    if (!route_id || !distance_km || !traffic_level || !base_time_min) {
      return res.status(400).json({ message: "All required fields must be filled" });
    }

    const route = await Route.create({
      route_id: Number(route_id),
      distance_km: Number(distance_km),
      traffic_level,
      base_time_min: Number(base_time_min),
    });

    res.status(201).json(route);
  } catch (err) {
    console.error("Create route error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Update route
exports.updateRoute = async (req, res) => {
  try {
    const route = await Route.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(route);
  } catch (err) {
    console.error("Update route error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete route
exports.deleteRoute = async (req, res) => {
  try {
    await Route.findByIdAndDelete(req.params.id);
    res.json({ message: "Route deleted" });
  } catch (err) {
    console.error("Delete route error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};
