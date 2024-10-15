"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const TeacherModel_1 = require("../Models/TeacherModel");
const bcrypt_1 = __importDefault(require("bcrypt"));
const StudentModel_1 = require("../Models/StudentModel");
require("dotenv/config");
const LoginService = async (user) => {
    try {
        const { user_name, password } = user;
        if (!user_name || !password) {
            throw new Error("All fields are required");
        }
        const isTeacher = await TeacherModel_1.TeacherModel.findOne({ user_name: user.user_name });
        if (isTeacher) {
            return await teacherLogin(user);
        }
        else {
            const isStudent = await StudentModel_1.StudentModel.findOne({ user_name: user.user_name });
            if (isStudent) {
                return await studentLoginService(user);
            }
            else {
                throw new Error("User not found");
            }
        }
    }
    catch (error) {
        throw error;
    }
};
exports.LoginService = LoginService;
const teacherLogin = async (user) => {
    try {
        const dbUser = await TeacherModel_1.TeacherModel.findOne({ user_name: user.user_name });
        if (!dbUser) {
            throw new Error("Teacher not found");
        }
        const isMatch = await bcrypt_1.default.compare(user.password, dbUser.password);
        if (!isMatch) {
            throw new Error("Invalid password");
        }
        const payload = {
            userId: dbUser._id,
            user_name: dbUser.user_name,
            class_name: dbUser.class_name,
            role: "teacher",
            class_id: dbUser._id
        };
        const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
        return token;
    }
    catch (error) {
        throw error;
    }
};
const studentLoginService = async (user) => {
    try {
        const dbUser = await StudentModel_1.StudentModel.findOne({ user_name: user.user_name });
        if (!dbUser) {
            throw new Error("Student not found");
        }
        const isMatch = await bcrypt_1.default.compare(user.password, dbUser.password);
        if (!isMatch) {
            throw new Error("Invalid password");
        }
        const token = jsonwebtoken_1.default.sign({ userId: dbUser._id, user_name: dbUser.user_name, role: "student", class_id: dbUser.class_ref }, process.env.JWT_SECRET, { expiresIn: "1d" });
        return token;
    }
    catch (error) {
        throw error;
    }
};
