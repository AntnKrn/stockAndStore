import { RequestHandler } from "express";

import { Employee } from "../models/Employee";
import { EmployeesData } from "../../repositories/Employee";

export const getEmployees: RequestHandler = async (req, res, next) => {
    try {
        const data = await EmployeesData.getEmployees();
        res.status(201).json(data);
    }catch(err) {
        console.log(err);
    }
}

export const postEmployee: RequestHandler = async (req, res, next) => {
    try {
        const {fullname, position, passportNumber, email}: Employee = req.body;
        const newEmployee = new Employee(fullname, position, passportNumber, email);

        await EmployeesData.postEmployee(newEmployee);
        res.status(201).json({ message: "Employee created", employee: newEmployee })
    }catch(err) {
        console.log(err);
    }
}

export const editEmployee: RequestHandler<{id: number}> = async (req, res, next) => {
    try {
        const id = req.params.id;
        const {fullname, position, passportNumber, email}: Employee = req.body;
        const editedEmployee = new Employee(fullname, position, passportNumber, email, id);

        await EmployeesData.editEmployee(editedEmployee);
        res.status(201).json({ message: "Employee created", employee: editedEmployee})
    }catch(err) {
        console.log(err);
    }
}

export const deleteEmployee: RequestHandler<{id: number}> = async (req, res, next) => {
    try {
        const id = req.params.id;

        await EmployeesData.deleteEmployee(id);
        res.status(201).json({ message: "Employee deleted"})
    }catch(err) {
        console.log(err);
    }
}