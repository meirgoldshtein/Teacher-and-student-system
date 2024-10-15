"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePost = exports.deletePost = exports.getPosts = exports.createPost = void 0;
const PostService_1 = require("../Services/PostService");
const createPost = async (req, res) => {
    try {
        if (!req.user) {
            throw new Error("Unauthorized while adding post");
        }
        const userId = req.user.userId;
        const post = req.body;
        const data = await (0, PostService_1.createPostService)(req.user.userId, req.body);
        res.status(201).json({ error: false, message: "post created", data });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "could not create post", 'error': error.message });
    }
};
exports.createPost = createPost;
const getPosts = async (req, res) => {
    try {
        if (!req.user) {
            throw new Error("Unauthorized while adding post");
        }
        const userId = req.user.userId;
        const data = await (0, PostService_1.getPostsService)(req.user.userId);
        res.status(200).json({ error: false, message: "success getting posts", data });
    }
    catch (error) {
        res.status(500).json({ message: "could not get posts", 'error': error });
    }
};
exports.getPosts = getPosts;
const deletePost = async (req, res) => {
    try {
        if (!req.user) {
            throw new Error("Unauthorized while deleting post");
        }
        const userId = req.user.userId;
        const postId = req.params.id;
        const data = await (0, PostService_1.deletePostService)(userId, postId);
        if (data) {
            res.status(200).json({ error: false, message: "success deleting post", data });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "could not delete posts", 'error': error.message });
    }
};
exports.deletePost = deletePost;
const updatePost = async (req, res) => {
    try {
        if (!req.user) {
            throw new Error("Unauthorized while updating post");
        }
        const userId = req.user.userId;
        const postId = req.params.id;
        const post = req.body;
        const data = await (0, PostService_1.updatePostService)(userId, postId, post);
        if (data) {
            res.status(200).json({ error: false, message: "success updating post", data });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "could not update posts", 'error': error.message });
    }
};
exports.updatePost = updatePost;
