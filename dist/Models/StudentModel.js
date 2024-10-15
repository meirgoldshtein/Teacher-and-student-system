"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
const testSchema = new mongoose_2.Schema({
    title: {
        type: String,
        required: [true, "title is required"],
        minlength: [3, "title must be at least 3 characters"],
    },
    grade: {
        type: Number,
        required: [true, "score is required"],
        min: [0, "score must be at least 0"],
        max: [100, "score must be at most 100"],
    }
});
const studentSchema = new mongoose_2.Schema({
    user_name: {
        type: String,
        required: [true, "user name is required"],
        minlength: [3, "user name must be at least 3 characters"],
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, "password is required"],
        minlength: [8, "password must be at least 8 characters"],
    },
    email: {
        type: String,
        required: [true, "email is required"],
        validate: [validator_1.default.isEmail, "invalid email"],
        trim: true,
        unique: true
    },
    class_ref: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "teacher",
        required: [true, "class is required"],
    },
    grade_average: {
        type: Number
    },
    grades: {
        type: [testSchema],
        default: []
    }
}, {
    timestamps: true
});
studentSchema.index({ email: 1 }, { unique: true });
studentSchema.index({ user_name: 1 }, { unique: true });
const StudentModel = mongoose_1.default.model("student", studentSchema);
exports.StudentModel = StudentModel;
