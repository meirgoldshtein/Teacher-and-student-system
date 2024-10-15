"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = exports.createUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const TeacherModel_1 = require("../Models/TeacherModel");
const createUser = async (user) => {
    try {
        console.log(user);
        const { user_name, password, email, role, area, units } = user;
        if (!user_name || !password || !email || !role || !area || !units) {
            throw new Error("All fields are required");
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const dbUser = new TeacherModel_1.UserModel({ user_name, password: hashedPassword, email, role, area, units });
        await dbUser.save();
        console.log("user added");
        return dbUser;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
};
exports.createUser = createUser;
const getAllUsers = async () => {
    try {
        const users = await TeacherModel_1.UserModel.find({});
        if (!users) {
            throw new Error("No users found");
        }
        return users;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
};
exports.getAllUsers = getAllUsers;
