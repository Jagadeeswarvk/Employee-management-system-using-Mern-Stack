const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");
const verifyJwt = require("./verifyToken");

router.use("/edit", verifyJwt);
router.use("/addEmployee", verifyJwt);
router.use("/delete", verifyJwt);
router.use("/getEmployees", verifyJwt);

router.post("/edit", employeeController.edit);
router.post("/addEmployee", employeeController.addEmployee);
router.get("/getEmployees", employeeController.getEmployees);
router.post("/delete", employeeController.delete);
module.exports = router;
