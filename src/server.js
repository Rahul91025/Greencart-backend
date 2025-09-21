const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/db");
const { errorHandler } = require("./middlewares/errorMiddleware");

// Routes
const authRoutes = require("./routes/authRoutes");
const driverRoutes = require("./routes/driverRoutes");
const orderRoutes = require("./routes/orderRoutes");
const routeRoutes = require("./routes/routeRoutes");
const simulationRoutes = require("./routes/simulationRoutes"); 

dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL || "*",
  credentials: true,
}));
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/drivers", driverRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/routes", routeRoutes);
app.use("/api/simulations", simulationRoutes); 


app.use(errorHandler);





module.exports = app;
