const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");

router.post("/edit", employeeController.edit);
router.post("/addEmployee", employeeController.addEmployee);
router.get("/getEmployees", employeeController.getEmployees);
router.post("/delete", employeeController.delete);
module.exports = router;
