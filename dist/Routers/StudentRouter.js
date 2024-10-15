"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const StudentController_1 = require("../Controllers/StudentController");
const { getMyAverageGrade, getMyGrades } = require("../Controllers/StudentController");
const AuthMiddelwares_1 = require("../Midllewares/AuthMiddelwares");
const router = express_1.default.Router();
/**
 * @swagger
 * /students/register:
 *   post:
 *     summary: Register a new student
 *     tags:
 *       - Student
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
 *               email:
 *                 type: string
 *               class_name:
 *                 type: string
 *             required:
 *               - user_name
 *               - email
 *               - password
 *               - class_name
 *           example:
 *             user_name: "joni"
 *             password: "1234"
 *             email: "joni@israeli.com"
 *             class_name: "golan"
 *     responses:
 *       201:
 *         description: A successful response
 *       400:
 *         description: Bad request
 */
router.post("/register", StudentController_1.register);
/**
 * @swagger
 * /students/my-average:
 *   get:
 *     summary: Get my average grade
 *     tags:
 *       - Student
 *     responses:
 *       200:
 *         description: A successful response
 *       400:
 *         description: Bad request
 */
router.get("/my-average", AuthMiddelwares_1.onlyStudents, getMyAverageGrade);
/**
 * @swagger
 * /students/my-grades:
 *   get:
 *     summary: Get my all grades
 *     tags:
 *       - Student
 *     responses:
 *       200:
 *         description: A successful response
 *       400:
 *         description: Bad request
 */
router.get("/my-grades", AuthMiddelwares_1.onlyStudents, getMyGrades);
exports.default = router;
