"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.onlyStudents = exports.onlyTeachers = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const TeacherModel_1 = require("../Models/TeacherModel");
require("dotenv/config");
const StudentModel_1 = require("../Models/StudentModel");
const onlyTeachers = async (request, res, next) => {
    try {
        const req = request;
        const token = req.cookies.token;
        if (!token) {
            res.status(401).json({ message: "No token provided", error: true });
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (decoded.role != "teacher") {
            res.status(401).json({ message: "only teachers are allowed to perform this action" });
            return;
        }
        if (decoded.exp && Date.now() >= decoded.exp * 1000) {
            res.status(401).json({ message: "Token has expired please login again", error: true });
            return;
        }
        const user = await TeacherModel_1.TeacherModel.findOne({ user_name: decoded.user_name });
        if (!user) {
            res.status(401).json({ message: "User no longer exists", error: true });
            return;
        }
        req.user = decoded;
        next();
    }
    catch (error) {
        console.log(error);
        res.status(401).json({ message: "Unauthorized", 'error': true, "details": error.message });
    }
};
exports.onlyTeachers = onlyTeachers;
const onlyStudents = async (request, res, next) => {
    try {
        const req = request;
        const token = req.cookies.token;
        if (!token) {
            res.status(401).json({ message: "No token provided", error: true });
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (decoded.role != "student") {
            res.status(401).json({ message: "only students are allowed to perform this action" });
            return;
        }
        if (decoded.exp && Date.now() >= decoded.exp * 1000) {
            res.status(401).json({ message: "Token has expired please login again", error: true });
            return;
        }
        const user = await StudentModel_1.StudentModel.findOne({ user_name: decoded.user_name });
        if (!user) {
            res.status(401).json({ message: "User no longer exists", error: true });
            return;
        }
        req.user = decoded;
        next();
    }
    catch (error) {
        console.log(error);
        res.status(401).json({ message: "Unauthorized", 'error': true, "details": error.message });
    }
};
exports.onlyStudents = onlyStudents;
