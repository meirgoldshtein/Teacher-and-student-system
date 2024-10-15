import mongoose from "mongoose";
import { Document, Schema, model, ObjectId } from "mongoose";
import validator from "validator";



interface Iteacher extends Document {
    user_name: string;
    password: string;
    email: string;
    class_name: string;
    students : ObjectId[];
 }



const teacherSchema = new Schema<Iteacher>({
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
    class_name: {
        type: String,
        required: [true, "class name is required"],
        minlength: [3, "class name must be at least 3 characters"],
        unique: true
    },
    students: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "student",
        default: [],
    }
},
{
timestamps: true
});

//  יצירת אינדקס ייחודי על שדה האימייל והכיתה
teacherSchema.index({ email: 1 }, { unique: true });
teacherSchema.index({ class_name: 1 }, { unique: true });
teacherSchema.index({ user_name: 1 }, { unique: true });

const TeacherModel = mongoose.model<Iteacher>("teacher", teacherSchema);

export { TeacherModel, Iteacher, teacherSchema}