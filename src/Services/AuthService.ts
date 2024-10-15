import jwt from "jsonwebtoken"
import { TeacherModel } from "../Models/TeacherModel"
import bcrypt from "bcrypt"
import { LoginDto } from "../Types/Interfaces/dto/reqDto"
import { StudentModel } from "../Models/StudentModel"
import "dotenv/config"
import TokenPayload from "../Types/Interfaces/tokenPayload"

const LoginService = async (user: LoginDto) => {
    try {

        const { user_name, password } = user

        if (!user_name || !password) {
            throw new Error("All fields are required")
        }
        const isTeacher = await TeacherModel.findOne({ user_name: user.user_name })

        if (isTeacher) {
            return await teacherLogin(user)
        }
        else {
            const isStudent = await StudentModel.findOne({ user_name: user.user_name })

            if (isStudent) {
               return await studentLoginService(user)
            }
            else {
                throw new Error("User not found")
            }
        }

        
    } catch (error) {
        throw error
    }
}

const teacherLogin = async (user: LoginDto) => {
    try {

        const dbUser = await TeacherModel.findOne({ user_name: user.user_name })
        if (!dbUser) {
            throw new Error("Teacher not found")
        }

        const isMatch = await bcrypt.compare(user.password, dbUser.password)

        if (!isMatch) {
            throw new Error("Invalid password")
        }
        const payload: TokenPayload = {
            userId: dbUser._id as string,
            user_name: dbUser.user_name,
            class_name: dbUser.class_name,
            role: "teacher",
            class_id: dbUser._id as string
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "1d" })

        return token

    } catch (error) {
        throw error
    }
}


const studentLoginService = async (user: LoginDto) => {
    try {

        const dbUser = await StudentModel.findOne({ user_name: user.user_name })
        if (!dbUser) {
            throw new Error("Student not found")
        }
        const isMatch = await bcrypt.compare(user.password, dbUser.password)
        if (!isMatch) {
            throw new Error("Invalid password")
        }
        const token = jwt.sign({ userId: dbUser._id, user_name: dbUser.user_name, role: "student", class_id: dbUser.class_ref }, process.env.JWT_SECRET!, { expiresIn: "1d" })
        return token
    } catch (error) {
        throw error
    }
}

export {
    LoginService
}