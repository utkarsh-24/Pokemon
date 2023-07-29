import { ObjectId } from "mongoose"

export interface PetEntity {
    userId: string,
    name: string,
    posterSrc: string,
    tags: string[],
    description: string,
    lastFeedTime: Date
    _id?: ObjectId,
    id?: string,
    adopted?: boolean,
    healthStatus?: number
}

export interface PetModelEntity extends PetEntity, Document { }