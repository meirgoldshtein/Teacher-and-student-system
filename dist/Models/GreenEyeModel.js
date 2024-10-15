"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const populationSchema = new mongoose_1.default.Schema({
    area: [String],
    units: [Number],
});
const GreenEyeSchema = new mongoose_1.default.Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    createdBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "user",
        required: [true, "createdBy is required"],
    },
    length: {
        type: Number,
        default: 3,
    },
    replies: {
        type: [mongoose_1.default.Schema.Types.ObjectId],
        ref: "user",
    },
    population: [populationSchema],
    title: {
        type: String,
        required: [true, "title is required"],
        minlength: [3, "title must be at least 3 characters"],
    }
});
const GreenEyeModel = mongoose_1.default.model("greenEye", GreenEyeSchema);
module.exports = GreenEyeModel;
