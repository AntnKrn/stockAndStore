"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEmployee = exports.editEmployee = exports.postEmployee = exports.getEmployees = void 0;
const Employee_1 = require("../models/Employee");
const Employee_2 = require("../../repositories/Employee");
const getEmployees = async (req, res, next) => {
    try {
        const data = await Employee_2.EmployeesData.getEmployees();
        res.status(201).json(data);
    }
    catch (err) {
        console.log(err);
    }
};
exports.getEmployees = getEmployees;
const postEmployee = async (req, res, next) => {
    try {
        const { fullname, position, passportNumber, email } = req.body;
        const newEmployee = new Employee_1.Employee(fullname, position, passportNumber, email);
        await Employee_2.EmployeesData.postEmployee(newEmployee);
        res.status(201).json({ message: "Employee created", employee: newEmployee });
    }
    catch (err) {
        console.log(err);
    }
};
exports.postEmployee = postEmployee;
const editEmployee = async (req, res, next) => {
    try {
        const id = req.params.id;
        const { fullname, position, passportNumber, email } = req.body;
        const editedEmployee = new Employee_1.Employee(fullname, position, passportNumber, email, id);
        await Employee_2.EmployeesData.editEmployee(editedEmployee);
        res.status(201).json({ message: "Employee created", employee: editedEmployee });
    }
    catch (err) {
        console.log(err);
    }
};
exports.editEmployee = editEmployee;
const deleteEmployee = async (req, res, next) => {
    try {
        const id = req.params.id;
        await Employee_2.EmployeesData.deleteEmployee(id);
        res.status(201).json({ message: "Employee deleted" });
    }
    catch (err) {
        console.log(err);
    }
};
exports.deleteEmployee = deleteEmployee;
