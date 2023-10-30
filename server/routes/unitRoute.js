const express = require("express");
const unitController = require('../controllers/unitController')
const router = express.Router();
 
router.get("/getAllUnits", unitController.getAllUnits)
router.post("/createUnit", unitController.createUnit)
router.put("/updateUnit/:id", unitController.updateUnit)
router.delete("/deleteUnit/:id", unitController.deleteUnit)

module.exports = router;