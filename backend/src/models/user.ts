import mongoose, { Schema } from "mongoose";
import { UserEntity } from "../entities/UserEntity";

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    }
})

export default mongoose.model<UserEntity>("user", userSchema)
