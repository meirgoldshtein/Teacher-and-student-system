import e from "express";
import{ Login, logout } from "../Controllers/AuthController"
const router = e.Router();

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
router.post("/login", Login)

router.delete("/logout", logout)
export default router;