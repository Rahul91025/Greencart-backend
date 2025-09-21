const express = require("express");
const router = express.Router();
const { getDrivers, createDriver, updateDriver, deleteDriver } = require("../controllers/driverController");
const { protect } = require("../middlewares/authMiddleware");

router.use(protect); 

router.route("/")
  .get(getDrivers)
  .post(createDriver);

router.route("/:id")
  .put(updateDriver)
  .delete(deleteDriver);

module.exports = router;
