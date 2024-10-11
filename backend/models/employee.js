const mongoose = require("mongoose");
const employeeSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  lastName: { type: String, required: true },
  salary: { type: Number, required: true },
  date: { type: String, required: true },
});

module.exports = mongoose.model("Employee", employeeSchema);
