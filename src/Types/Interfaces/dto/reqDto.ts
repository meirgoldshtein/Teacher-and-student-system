import { Request } from 'express';
import TokenPayload from '../tokenPayload';

interface NewUserDto {
    user_name: string;
    password: string;
    email: string;
    class_name: string;
}

interface LoginDto {
    user_name: string;
    password: string;
}

interface gradeDto {
    title: string
    grade: number
}


interface RequestWithToken extends Request {
    user: TokenPayload;

  }
export {NewUserDto, gradeDto, RequestWithToken, LoginDto}