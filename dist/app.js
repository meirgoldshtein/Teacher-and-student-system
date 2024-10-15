"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log("program started");
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const dbConfig_1 = require("./Config/dbConfig");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const Swagger_1 = require("./Swagger/Swagger");
const TeacherRouter_1 = __importDefault(require("./Routers/TeacherRouter"));
const StudentRouter_1 = __importDefault(require("./Routers/StudentRouter"));
const AuthRouter_1 = __importDefault(require("./Routers/AuthRouter"));
const app = (0, express_1.default)();
(0, dbConfig_1.connectToDB)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
// Error handling middleware
const errorHandler = (err, req, res, next) => {
    if (err instanceof SyntaxError && 'status' in err && err.status === 400 && 'body' in err) {
        console.error("Invalid JSON:", err);
        res.status(400).json({ message: "Invalid JSON" });
    }
    else {
        next(err);
    }
};
app.use(errorHandler);
app.use('/teachers', TeacherRouter_1.default);
app.use('/students', StudentRouter_1.default);
app.use('/auth', AuthRouter_1.default);
app.use('/api-docs', Swagger_1.swaggerUi.serve, Swagger_1.swaggerUi.setup(Swagger_1.specs));
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
