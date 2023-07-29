import mongoose, { Schema } from "mongoose";
import { PetEntity } from "../entities/PetEntity";
import { number } from "joi";

const petSchema = new Schema({
    userId: {
        type: "string",
        required: true
    },
    name: {
        type: "string",
        required: true
    },
    posterSrc: {
        type: "string",
        required: true
    },
    tags: {
        type: [String],
        required: true
    },
    description: {
        type: "string",
        required: true
    },
    lastFeedTime: {
        type: Date,
        default: Date.now,
    },
    adopted:{
        type:"boolean",
        default:true
    },
    healthStatus:{
        type:"number",
        default:10,
        max:10,
        min:0   
    }
})

export default mongoose.model<PetEntity>("pet", petSchema)