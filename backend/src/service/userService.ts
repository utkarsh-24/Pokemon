import { UserEntity, UserLoginEntity, UserTokenEntity } from "../entities/UserEntity";
import User from "../models/user";
import ErrorHandler from "../utils/errorHandler";
import path from "path"
import fs from "fs"
import jwt from "jsonwebtoken"
import { ObjectId } from "mongoose";

const createUser = async (data: UserEntity) => {
    try {
        const { email } = data;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            throw new ErrorHandler("User already exists", 409);
        }

        const newUser = new User(data);
        await newUser.validate();

        const createdUser = await newUser.save();
        const updatedUser = await User.findByIdAndUpdate(createdUser._id, { $set: { userId: createdUser._id } }, { new: true });

        return { success: true, message: "User created successfully", "data": updatedUser };
    } catch (error) {
        throw new ErrorHandler("Failed to create user", 500);
    }
};

const loginUser = async (data: UserLoginEntity) => {
    const { email, password } = data
    const user = await User.findOne({ email })
    if (user) {
        if (user.password == password) {
            const userTokenData: UserTokenEntity = {
                userId: user._id.toString(),
                name: user.name as string,
            };
            let token = generateUserToken(userTokenData)
            return { success: true, message: "successfully loggedIn ", token: token }
        }
        throw new ErrorHandler("Incorrect password", 400)
    } else {
        throw new ErrorHandler("user not found", 404)
    }
}

const generateUserToken = (details: UserTokenEntity): string => {
    const privateKeyPath = path.join(__dirname, "../keys/private.key.pem");
    const privateKeyPem = fs.readFileSync(privateKeyPath, 'utf8');
    const token = jwt.sign(details, privateKeyPem, { algorithm: 'RS256' });
    return token;
}


const getUserById = async (userId: string | ObjectId) => {
    const user = await User.findById(userId)
    if (user) {
        return user;
    } else {
        throw new ErrorHandler("user not found", 404)
    }
}


export default { createUser, loginUser, getUserById };
