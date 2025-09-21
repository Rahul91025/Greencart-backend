const Order = require("../models/Order");

// Get all orders
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("assignedDriver", "name");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders", error: err.message });
  }
};

// Create order
exports.createOrder = async (req, res) => {
  try {
    const { customerName, address, value, estimatedTime, assignedDriver } = req.body;

    
    if (!customerName || !address || !value || !estimatedTime) {
      return res.status(400).json({ message: "All required fields must be filled" });
    }

  
    const orderData = {
      customerName,
      address,
      value: Number(value),
      estimatedTime: Number(estimatedTime),
      assignedDriver: assignedDriver || undefined, // optional
    };

    const order = await Order.create(orderData);
    res.status(201).json(order);

  } catch (err) {
    console.error("Create order error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};



// Update order
exports.updateOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate("assignedDriver", "name");
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(400).json({ message: "Failed to update order", error: err.message });
  }
};

// Delete order
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json({ message: "Order deleted" });
  } catch (err) {
    res.status(400).json({ message: "Failed to delete order", error: err.message });
  }
};
