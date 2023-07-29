import { NextFunction, Response } from "express";
import { RequestEntity } from "../entities/RequestEntity";
import ErrorHandler from "../utils/errorHandler";
import pokemonService from "../service/pokemonService";

const getAll = async (req: RequestEntity, res: Response, next: NextFunction) => {
    try {
        const result = await pokemonService.getAllPokemon();
        return res.send(result)
    } catch (error: any) {
        next(new ErrorHandler(error.message, error.statusCode ?? 500))
    }
}

const adoptPokemon = async (req: RequestEntity, res: Response, next: NextFunction) => {
    try {
        const result = await pokemonService.adoptPokemon(req.userId, req.params.id)
        return res.send(result)
    } catch (err: any) {
        next(new ErrorHandler(err.message, err.statusCode ?? 500))
    }
}

export default { getAll, adoptPokemon }
