import { NextFunction, Response } from "express";
import { RequestEntity } from "../entities/RequestEntity";
import { loginValidator, signupValidator } from "../validators/authValidator";
import ErrorHandler from "../utils/errorHandler";
import User from "../service/userService"

const login = async (req: RequestEntity, res: Response, next: NextFunction) => {
    try {
        const body = req.body;
        if (body) {
            const result = loginValidator.validate(body);
            if (result.error) {
                next(new ErrorHandler(result.error.details[0].message, 400))
            } else {
                const loginRes = await User.loginUser(body)
                return res.send(loginRes);
            }
        } else {
            next(new ErrorHandler("Missing payload", 400))
        }
    } catch (error: any) {
        next(new ErrorHandler(error.message, error.statusCode ?? 500))
    }
}

const signup = async (req: RequestEntity, res: Response, next: NextFunction) => {
    try {
        const body = req.body;
        if (body) {
            const result = signupValidator.validate(body)
            if (result.error) {
                next(new ErrorHandler(result.error.details[0].message, 400))
            } else {
                const userRes = await User.createUser(body)
                res.send(userRes)
            }
        }
        next(new ErrorHandler("Missing payload", 400))
    } catch (error: any) {
        next(new ErrorHandler(error.message, error.statusCode))
    }
}

export default { login, signup }