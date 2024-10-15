"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePostService = exports.deletePostService = exports.getPostsService = exports.createPostService = void 0;
const StudentModel_1 = require("../Models/StudentModel");
const TeacherModel_1 = require("../Models/TeacherModel");
const createPostService = async (userId, post) => {
    try {
        const user = await TeacherModel_1.UserModel.findById(userId);
        if (!user) {
            throw new Error("user not found");
        }
        const { title, content } = post;
        if (!title || !content) {
            throw new Error("all fields are required");
        }
        const newPost = new StudentModel_1.PostModel({ title, content });
        newPost.author = user._id;
        await newPost.save();
        user.posts.push(newPost._id);
        await user.save();
        return newPost;
    }
    catch (error) {
        throw error;
    }
};
exports.createPostService = createPostService;
const getPostsService = async (userId) => {
    try {
        const user = await TeacherModel_1.UserModel.findById(userId);
        if (!user) {
            throw new Error("user not found");
        }
        // return user.populate("posts")
        // const posts = PostModel.find({author: user._id})
        const posts = StudentModel_1.PostModel.find()
            .select('title content createdAt -_id')
            .populate({
            path: "author",
            select: "user_name email -_id",
        }).populate({
            path: "comments.author",
            select: "user_name",
        });
        return posts;
    }
    catch (error) {
        throw error;
    }
};
exports.getPostsService = getPostsService;
const deletePostService = async (userId, postId) => {
    try {
        const user = await TeacherModel_1.UserModel.findById(userId);
        if (!user) {
            throw new Error("user not found");
        }
        console.log(postId);
        const post = await StudentModel_1.PostModel.findById(postId);
        if (!post) {
            throw new Error("post not found");
        }
        if (post.author.toString() !== user._id.toString()) {
            throw new Error("you are not the author of this post");
        }
        //delete post
        await StudentModel_1.PostModel.findByIdAndDelete(postId);
        // delete post referenced from user
        const result = await user.updateOne({ posts: postId }, { $pull: { posts: postId } });
        if (result.modifiedCount === 0) {
            throw new Error("post not deleted");
        }
        return post;
    }
    catch (error) {
        throw error;
    }
};
exports.deletePostService = deletePostService;
const updatePostService = async (userId, postId, post) => {
    try {
        const user = await TeacherModel_1.UserModel.findById(userId);
        if (!user) {
            throw new Error("user not found");
        }
        const postToUpdate = await StudentModel_1.PostModel.findById(postId);
        if (!postToUpdate) {
            throw new Error("post not found");
        }
        if (postToUpdate.author.toString() !== user._id.toString()) {
            throw new Error("you are not the author of this post");
        }
        const updatedPost = await StudentModel_1.PostModel.findByIdAndUpdate(postId, post, { new: true });
        if (!updatedPost) {
            throw new Error("post not found");
        }
        return updatedPost;
    }
    catch (error) {
        throw error;
    }
};
exports.updatePostService = updatePostService;
