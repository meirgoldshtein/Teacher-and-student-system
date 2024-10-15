import e from "express"
import { StudentModel } from "../Models/StudentModel"
import { TeacherModel } from "../Models/TeacherModel"
import { ObjectId } from "mongoose"
import bcrypt from "bcrypt"
import mongoose from "mongoose"
import { NewUserDto } from "../Types/Interfaces/dto/reqDto"



const createStudentService = async (user: NewUserDto) => {
    try {
        console.log(user)
        const{user_name, password, email , class_name} = user
        if (!user_name || !password || !email || !class_name) {
            throw new Error("All fields are required");
        }
        const user_nameExists = await TeacherModel.findOne({user_name}).exec();
        if (user_nameExists) {
            throw new Error("user name is not available");
        }
        const classExists = await TeacherModel.findOne({class_name}).exec();
        if (!classExists) {
            throw new Error("class name not found");
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const class_ref = (classExists._id as ObjectId)
        const dbUser = new StudentModel({user_name, password: hashedPassword,email, class_ref})
        
        await dbUser.save()
        console.log("student added")
        return dbUser      
    } catch (error) {
        console.log(error)
        throw error
    }
} 

const getMyAverageService = async (student_id: string): Promise<any> => {
    try {

        const student = await StudentModel.findById(student_id)
        if (!student) {
            throw new Error("Student not found")
        }
        const average = await StudentModel.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(student_id) } },
            { $unwind: "$grades" },
            { $group: { _id: "$_id", avg_grade: { $avg: "$grades.grade" } } },
            {
                $project: {
                    _id: 0,
                    my_average_grade: { $round: ["$avg_grade", 1] }
                }
            }
        ])
        return average
    }
    catch (error) {
        console.log(error)
        throw error
    }
}


const getMyGradesService = async (student_id: string): Promise<any> => {
    try {
        const student = await StudentModel.findById(student_id)
        if (!student) {
            throw new Error("Student not found")
        }
        return student.grades
    }
    catch (error) {
        console.log(error)
        throw error
    }
}

export { 
    createStudentService,
    getMyAverageService,
    getMyGradesService
 }