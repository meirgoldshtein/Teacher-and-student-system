"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.teacherSchema = exports.TeacherModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
const teacherSchema = new mongoose_2.Schema({
    user_name: {
        type: String,
        required: [true, "user name is required"],
        minlength: [3, "user name must be at least 3 characters"],
        trim: true,
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
    class_name: {
        type: String,
        required: [true, "class name is required"],
        minlength: [3, "class name must be at least 3 characters"],
    },
    students: {
        type: [mongoose_1.default.Schema.Types.ObjectId],
        ref: "student",
        default: [],
    }
}, {
    timestamps: true
});
exports.teacherSchema = teacherSchema;
// יצירת אינדקס ייחודי על שדה האימייל
teacherSchema.index({ email: 1 }, { unique: true });
const TeacherModel = mongoose_1.default.model("teacher", teacherSchema);
exports.TeacherModel = TeacherModel;
