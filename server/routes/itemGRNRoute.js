const express = require("express");
const itemGRNController = require('../controllers/itemGRNController');
const router = express.Router();
 
router.get("/getAllItemGRN", itemGRNController.getAllItemGRN)
router.post("/getItemGRNByPlant", itemGRNController.getItemGRNByPlant)
router.get("/getItemGRNById /:id", itemGRNController.getItemGRNById )
router.post("/createItemGRN", itemGRNController.createItemGRN)
router.put("/updateItemGRN/:id", itemGRNController.updateItemGRN)
router.delete("/deleteItemGRN", itemGRNController.deleteItemGRN)


module.exports = router;