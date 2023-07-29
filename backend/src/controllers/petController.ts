import { NextFunction, Response } from "express";
import { RequestEntity } from "../entities/RequestEntity";
import petService from "../service/petService";
import ErrorHandler from "../utils/errorHandler";

const getPets = async (req: RequestEntity, res: Response, next: NextFunction) => {
    try {
        const userId = req.userId;
        const result = await petService.getUserPets(userId);
        return res.send(result);
    } catch (err: any) {
        next(new ErrorHandler(err.message, err.statusCode ?? 500));
    }
}


const feedPet = async (req: RequestEntity, res: Response, next: NextFunction) => {
    try {
        const petId = req.params.id;
        const result = await petService.feedPet(petId)
        return res.send(result)
    } catch (err: any) {
        next(new ErrorHandler(err.message, err.statusCode ?? 500))
    }
}


export default { getPets, feedPet }