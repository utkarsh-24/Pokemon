import { ObjectId } from "mongoose"

export interface PokemonEntity extends Document {
    name: string,
    posterSrc: string,
    tags: string[],
    description: string
    _id?: ObjectId,
    id?: string,
    adopted?:boolean
}