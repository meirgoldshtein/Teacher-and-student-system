import { NewUserDto,gradeDto } from "../Types/Interfaces/dto/reqDto"
import bcrypt from "bcrypt"
import {Iteacher, TeacherModel} from "../Models/TeacherModel"
import { Istudent, StudentModel } from "../Models/StudentModel"
import { ObjectId } from "mongoose"
import mongoose from "mongoose"

const createTeacher = async (user: NewUserDto) => {
    try {
        console.log(user)
        const{user_name, password, email , class_name} = user
        if (!user_name || !password || !email || !class_name) {
            throw new Error("All fields are required");
        }
        const user_nameExists = await StudentModel.findOne({user_name}).exec();
        if (user_nameExists) {
            throw new Error("user name is not available");
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const dbUser = new TeacherModel({user_name, password: hashedPassword, email,  class_name})
        await dbUser.save()
        console.log("teacher added")
        return dbUser      
    } catch (error) {
        console.log(error)
        throw error
    }
} 


const getMyStudentsService = async (class_id: string): Promise<Istudent[]> => {
    try {

        const students = await StudentModel.find({class_ref: class_id})
        if (!students) {
            throw new Error("No students found")
        }
        return students
    } catch (error) {
        console.log(error)
        throw error
    }
}

const addGradeService = async (teacher_id: string, student_id: string, dto: gradeDto) => {
    try {
        const {title, grade} = dto
        if (!title || !grade) {
            throw new Error("All fields are required")
        }
        const student = await StudentModel.findById(student_id)
        if (!student) {
            throw new Error("Student not found")
        }
        const teacher = await TeacherModel.findById(teacher_id)
        if (!teacher) {
            throw new Error("Teacher not found")
        }
        if (student.class_ref.toString() !== teacher_id) {
            throw new Error("Student and teacher are not in the same class")
        }

        const updatedStudent = await StudentModel.findByIdAndUpdate(student_id, {$push: {grades: dto}}, {new: true})
        if (!updatedStudent) {
            throw new Error("Student not updated")
        }
        return updatedStudent
    } catch (error) {
        console.log(error)
        throw error
    }
}

const updateGradeService = async (teacher_id: string, test_id: string, dto: gradeDto) => {
    try {
        if (!dto) {
            throw new Error('grade is required')
        }
        const {grade} = dto
        if (grade === undefined) {
            throw new Error("Grade is required")
        }
        const student = await StudentModel.findOne({grades: {$elemMatch: {_id: test_id}}})
        if (!student) {
            throw new Error("Test not found")
        }
        const teacher = await TeacherModel.findById(teacher_id)
        if (!teacher) {
            throw new Error("Teacher not found")
        }
        if (student.class_ref.toString() !== teacher_id) {
            throw new Error("Test and teacher are not in the same class")
        }
        const test = student.grades.find(grade => (grade._id as ObjectId).toString() === test_id)
        if (!test) {
            throw new Error("Test not found")
        }
        test.grade = grade
        await student.save()
        return test
    } catch (error) {
        console.log(error)
        throw error
    }
}


const getClassAverageGradeService = async (class_id: string) => {
    try {
        const students = await StudentModel.find({class_ref: class_id})
        if (!students) {
            throw new Error("No students found")
        }
        // const average = students.reduce((acc, student) => acc + student.grades.reduce((acc, grade) => acc + grade.grade, 0) / student.grades.length, 0)
        // const studentAverage = average / students.length
        const average = await StudentModel.aggregate(
            [
              { "$match": { "class_ref": new mongoose.Types.ObjectId(class_id) } },
              { "$unwind": "$grades" },
              { "$group": { "_id": "$_id", "user_name": { "$first": "$user_name" }, "average_grade": { "$avg": "$grades.grade" } } },
              { "$project": { "_id": 0, "user_name": 1, "average_grade": { "$round": ["$average_grade", 1]  } }}
            ]
            )

        const generalAverage = await StudentModel.aggregate(
            [
              { $unwind: '$grades' },
              {
                $group: {
                  _id: '$class_ref',
                  avg_grade: { $avg: '$grades.grade' }
                }
              },
              {"$project": { "_id": 0, "general_grade": { "$round": ["$avg_grade", 1]  } }}
            ])
        return {generalAverage, "average per student": average}
    } catch (error) {
        console.log(error)
        throw error
    }
}


const getStudentGradesService = async (student_id: string) => {
    try {
        const student = await StudentModel.findById(student_id)
        if (!student) {
            throw new Error("Student not found")
        }
        return student.grades
    } catch (error) {
        console.log(error)
        throw error
    }
}

export {
    createTeacher,
    getMyStudentsService,
    addGradeService,
    updateGradeService,
    getClassAverageGradeService,
    getStudentGradesService
}