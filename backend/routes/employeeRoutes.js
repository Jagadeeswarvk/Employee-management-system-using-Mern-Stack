const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");
<<<<<<< HEAD
const verifyJwt = require('./verifyToken');

router.use("/edit", verifyJwt);
router.use("/addEmployee", verifyJwt);
router.use("/delete", verifyJwt);
router.use("/getEmployees", verifyJwt);
=======
>>>>>>> fe21d27606e0dfbcb7a4905919436531c0531482

router.post("/edit", employeeController.edit);
router.post("/addEmployee", employeeController.addEmployee);
router.get("/getEmployees", employeeController.getEmployees);
router.post("/delete", employeeController.delete);
module.exports = router;
