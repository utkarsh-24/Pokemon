import mongoose from "mongoose"
import pet from "../models/pet"
import Pet from "../models/pet"
import ErrorHandler from "../utils/errorHandler"
import { PetEntity } from "../entities/PetEntity"

const getUserPets = async (userId: string | undefined) => {
    if (!userId) {
        throw new ErrorHandler("userId is undefined", 400)
    } else {
        const pets = await Pet.find({ userId })
        return { success: true, data: pets }
    }
}

const feedPet = async (petId: string) => {
    if (!petId) {
        throw new ErrorHandler("petId is undefined", 400)
    } else {
        const _id = new mongoose.Types.ObjectId(petId)
        const petData: PetEntity | null = await Pet.findById(_id)
        if (!petData) {
            throw new ErrorHandler("Pet not found", 404)
        }
        if (petData && petData.healthStatus != undefined && petData.healthStatus < 10) {
            const pet = await Pet.findByIdAndUpdate({ _id }, {
                $set: {
                    lastFeedTime: new Date()
                },
                $inc: {
                    healthStatus: 2
                }
            }, { new: true })
            return { success: true, data: pet }
        }
        return { success: true, data: petData }
    }
}

export default { getUserPets, feedPet }