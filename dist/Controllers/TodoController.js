"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTodo = void 0;
const TodoService_1 = require("../Services/TodoService");
const addTodo = async (req, res) => {
    try {
        if (!req.user) {
            throw new Error("Unauthorized while adding todo");
        }
        const userId = req.user.userId;
        const todo = req.body;
        const data = await (0, TodoService_1.addTodoService)(userId, todo);
        res.status(201).json({ error: false, message: "success adding todo", data });
        console.log("success adding todo");
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "could not adding todo", 'error': error.message });
    }
};
exports.addTodo = addTodo;
