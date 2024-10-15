"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMyGradesService = exports.getMyAverageService = exports.createStudentService = void 0;
const StudentModel_1 = require("../Models/StudentModel");
const TeacherModel_1 = require("../Models/TeacherModel");
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_1 = __importDefault(require("mongoose"));
const createStudentService = async (user) => {
    try {
        console.log(user);
        const { user_name, password, email, class_name } = user;
        if (!user_name || !password || !email || !class_name) {
            throw new Error("All fields are required");
        }
        const user_nameExists = await TeacherModel_1.TeacherModel.findOne({ user_name }).exec();
        if (user_nameExists) {
            throw new Error("user name is not available");
        }
        const classExists = await TeacherModel_1.TeacherModel.findOne({ class_name }).exec();
        if (!classExists) {
            throw new Error("class name not found");
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const class_ref = classExists._id;
        const dbUser = new StudentModel_1.StudentModel({ user_name, password: hashedPassword, email, class_ref });
        await dbUser.save();
        console.log("student added");
        return dbUser;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
};
exports.createStudentService = createStudentService;
const getMyAverageService = async (student_id) => {
    try {
        const student = await StudentModel_1.StudentModel.findById(student_id);
        if (!student) {
            throw new Error("Student not found");
        }
        const average = await StudentModel_1.StudentModel.aggregate([
            { $match: { _id: new mongoose_1.default.Types.ObjectId(student_id) } },
            { $unwind: "$grades" },
            { $group: { _id: "$_id", avg_grade: { $avg: "$grades.grade" } } },
            {
                $project: {
                    _id: 0,
                    my_average_grade: { $round: ["$avg_grade", 1] }
                }
            }
        ]);
        return average;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
};
exports.getMyAverageService = getMyAverageService;
const getMyGradesService = async (student_id) => {
    try {
        const student = await StudentModel_1.StudentModel.findById(student_id);
        if (!student) {
            throw new Error("Student not found");
        }
        return student.grades;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
};
exports.getMyGradesService = getMyGradesService;
