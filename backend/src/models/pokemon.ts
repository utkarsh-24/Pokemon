import mongoose, { Schema } from "mongoose";
import { PokemonEntity } from "../entities/PokemonEntity";
import { bool, boolean } from "joi";

const pokemonSchema = new Schema({
    name: {
        type: "string",
        required: true
    },
    posterSrc: {
        type: "string",
        required: true
    },
    tags: {
        type: Array<string>,
        required: true
    },
    description: {
        type: "string",
        required: true
    },
    adopted: {
        type: "boolean",
        default: false
    }
})

export default mongoose.model<PokemonEntity>("pokemon", pokemonSchema)