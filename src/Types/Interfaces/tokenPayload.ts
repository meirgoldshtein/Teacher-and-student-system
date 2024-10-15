import {JwtPayload} from "jsonwebtoken"

interface TokenPayload extends JwtPayload {
    userId: string
    user_name: string
    class_name: string
    class_id: string
    role: "student" | "teacher"
}

export default TokenPayload