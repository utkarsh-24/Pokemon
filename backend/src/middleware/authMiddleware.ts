import { Response, NextFunction } from "express";
import { RequestEntity } from "../entities/RequestEntity";
import { UserTokenEntity } from "../entities/UserEntity";
import logger from "../utils/logger";
import path from "path"
import fs from "fs"
import jwt, { VerifyOptions } from 'jsonwebtoken';
import userService from "../service/userService";

const beforeHandleRequest = async (req: RequestEntity, res: Response, next: NextFunction) => {
    const url = req.url;
    if (url == "/auth/login" || url == "/auth/signup") {
        next()
    } else {
        const token = req.headers.authorization?.split(' ')[1] || req.query.bearer as string;  // Assuming token is provided in the Authorization header
        if (!token) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }
        try {
            const decodedToken: UserTokenEntity = decodeToken(token);
            const user = await userService.getUserById(decodedToken.userId)
            // Do additional checks or operations based on the decoded payload if needed
            req.userId = user._id.toString() // Store the user payload in the request object for further processing
            next();
        } catch (error) {
            logger.error(error)
            return res.status(401).json({ success: false, message: 'Invalid token' });
        }
    }
}

const decodeToken = (token: string): UserTokenEntity => {
    const publicKeyPath = path.join(__dirname, '../keys/public.key.pem');
    const publicKey = fs.readFileSync(publicKeyPath, 'utf8');
    const options: VerifyOptions = { algorithms: ['RS256'] };
    const decoded = jwt.verify(token, publicKey, options) as UserTokenEntity;
    return decoded;
}

export { beforeHandleRequest }