const express = require("express");
const itemDcController = require('../controllers/itemDcController')
const router = express.Router();
 
router.get("/getAllItemDc", itemDcController.getAllItemDc)
router.post("/getItemDCByPlant", itemDcController.getItemDCByPlant)
router.get("/getItemDcById /:id", itemDcController.getItemDcById )
router.post("/createItemDc", itemDcController.createItemDc)
router.put("/updateItemDc/:id",itemDcController.updateItemDc)
router.delete("/deleteItemDc", itemDcController.deleteItemDc)

module.exports = router;