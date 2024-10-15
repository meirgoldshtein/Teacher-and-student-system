import mongoose, { ObjectId } from "mongoose";
import { Document, Schema, model } from "mongoose";
import validator from "validator";

interface Itest extends Document {
    title: string;
    grade: number;
}

interface Istudent extends Document {
    user_name: string;
    password: string;
    email: string;
    grade_average : number
    class_ref: ObjectId;
    grades: Itest[];
}

const testSchema = new Schema<Itest>({
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

const studentSchema = new Schema<Istudent>({
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
        validate: [validator.isEmail, "invalid email"],
        trim: true,
        unique: true
    },
    class_ref: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "teacher",
        required: [true, "class is required"],
    },
    grade_average : {
        type: Number
    },
    grades: {
        type: [testSchema],
        default: []
    }
},{
    timestamps: true
    });

    
studentSchema.index({ email: 1 }, { unique: true });
studentSchema.index({ user_name: 1 }, { unique: true });
const StudentModel = mongoose.model<Istudent>("student", studentSchema);

export { StudentModel, Istudent, Itest}