const mongoose = require("mongoose");

const routeSchema = new mongoose.Schema({
  route_id: { type: Number, required: true },
  distance_km: { type: Number, required: true },
  traffic_level: { type: String, required: true },
  base_time_min: { type: Number, required: true }
});

module.exports = mongoose.model("Route", routeSchema);
