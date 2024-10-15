"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthController_1 = require("../Controllers/AuthController");
const router = express_1.default.Router();
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a teacher or student
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_name:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - user_name
 *               - password
 *           example:
 *             user_name: "israel israeli"
 *             password: "1234"
 *     responses:
 *       200:
 *         description: A successful response
 */
router.post("/login", AuthController_1.Login);
router.delete("/logout", AuthController_1.logout);
exports.default = router;
