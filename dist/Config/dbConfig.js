"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connectToDB = async () => {
    try {
        await mongoose_1.default.connect("mongodb://localhost:27017/school", {});
        console.log("connected to mongo db");
    }
    catch (error) {
    }
};
exports.connectToDB = connectToDB;
