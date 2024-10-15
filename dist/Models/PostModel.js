"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const commentSchema = new mongoose_2.Schema({
    content: {
        type: String,
        required: [true, "content is required"],
        minlength: [3, "content must be at least 3 characters"],
        trim: true,
    },
    author: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "user",
        required: [true, "user is required"],
    }
});
const postSchema = new mongoose_2.Schema({
    title: {
        type: String,
        required: [true, "title is required"],
        minlength: [3, "title must be at least 3 characters"],
        trim: true,
    },
    content: {
        type: String,
        required: [true, "content is required"],
        minlength: [3, "content must be at least 3 characters"],
        trim: true,
    },
    author: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "user",
        required: [true, "author is required"],
    },
    comments: {
        type: [commentSchema],
        default: [],
    }
}, {
    timestamps: true
});
const PostModel = mongoose_1.default.model("post", postSchema);
exports.PostModel = PostModel;
