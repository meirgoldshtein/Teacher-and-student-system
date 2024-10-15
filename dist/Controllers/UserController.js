"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setSettings = exports.getUsers = exports.register = void 0;
const UserService_1 = require("../Services/UserService");
const register = async (req, res) => {
    try {
        const data = await (0, UserService_1.createUser)(req.body);
        res.status(201).json({ error: false, message: "User Created", data });
        console.log("user created");
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "could not create user", 'error': error.message });
    }
};
exports.register = register;
const getUsers = async (req, res) => {
    try {
        const data = await (0, UserService_1.getAllUsers)();
        res.status(200).json({ error: false, message: "success getting users", data });
    }
    catch (error) {
        res.status(500).json({ message: "could not get users", 'error': error });
    }
};
exports.getUsers = getUsers;
const setSettings = async (req, res) => {
    try {
    }
    catch (error) {
    }
};
exports.setSettings = setSettings;
