const express = require("express");
const Employee = require("../models/employee");
const { findOne } = require("../models/user");

exports.edit = async (req, res) => {
  const { _id, firstName, lastName, email, salary, date } = req.body;
  try {
    const employee = await Employee.findOne({ _id });

    console.log(employee);
    employee.firstName = firstName;
    employee.lastName = lastName;
    employee.email = email;
    employee.salary = salary;
    employee.date = date;

    await employee.save();
    res.status(200).json(employee);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.addEmployee = async (req, res) => {
  const { firstName, lastName, email, salary, date } = req.body;
  try {
    const employee = await Employee.findOne({ email });
    if (employee) {
      console.log("employee already existed");
      return res.status(400).json({ error: "employee already existed" });
    }

    try {
      const newEmployee = await Employee.create({
        firstName,
        lastName,
        email,
        salary,
        date,
      });
      res.status(200).json(newEmployee);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.delete = async (req, res) => {
  const { _id } = req.body;
  try {
    // Find the employee by email
    const employee = await Employee.findOne({ _id });
    console.log(employee);
    // If employee not found, return 404 Not Found
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    // Delete the employee
    await employee.deleteOne({ _id });

    // Respond with a success message
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getEmployees = async (req, res) => {
  try {
    // Fetch all users from the database
    console.log("employees of the database");
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
