<<<<<<< HEAD
const express = require("express");
const departmentController = require('../controllers/departmentController')
const router = express.Router();
 
router.get("/getDepartment", departmentController.getDepartment)
router.post("/createDepartment", departmentController.createDepartment)
router.put("/updateDepartment/:id", departmentController.updateDepartment)
router.delete("/deleteDepartment/:id", departmentController.deleteDepartment)
=======
const express = require('express');
const departmentController = require('../controllers/departmentController')
const router = express.Router();


router.get('/getAllDepartments', departmentController.getDepartment);
router.post('/createDepartment', departmentController.createDepartment);


>>>>>>> origin

module.exports = router;