import { ObjectId } from "mongoose";

export interface UserEntity extends Document {
    name: string,
    email: string,
    password: string,
    userId?: string,
    _id?: ObjectId
}

export interface UserLoginEntity {
    email: string,
    password: string,
}

export interface UserTokenEntity {
    userId: string;
    name: string;
}