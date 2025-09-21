const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

const { runSimulation, getAllSimulations } = require("../controllers/simulationController");


router.post("/", runSimulation);


router.get("/", getAllSimulations);

module.exports = router;
