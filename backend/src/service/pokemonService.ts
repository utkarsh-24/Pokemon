import { PokemonEntity } from "../entities/PokemonEntity"
import Pokemon from "../models/pokemon"
import Pet from "../models/pet"
import ErrorHandler from "../utils/errorHandler"
import mongoose, { ObjectId } from "mongoose"

const getAllPokemon = async () => {
    const allPokemon = await Pokemon.find()
    if (allPokemon.length > 0) {
        return { success: true, data: allPokemon }
    }
    return { success: false, message: "Pokemon not found" }
}
const adoptPokemon = async (userId: string | undefined, pokemonId: string | undefined) => {
    if (userId === undefined || pokemonId === undefined) {
        throw new ErrorHandler("userId or pokemonId is undefined", 400)
    } else {
        const pokemon = await Pokemon.findById(new mongoose.Types.ObjectId(pokemonId));
        if (!pokemon) {
            return { success: false, message: 'Pokémon not found.' };
        }
        let pet = { ...pokemon.toObject(), userId: userId };
        pet.adopted = true;
        const findPet = await Pet.findById(pet._id);
        if(!findPet) {
            const newPet = new Pet(pet);
            await newPet.validate();
            const result = await newPet.save();
            if(result)
            {
                await Pokemon.updateOne({_id:pet._id},{$set:{adopted:true}})
            }
            return { success: true, data: result}
        }
        return {success:false,message:"Pet already adopted"};
    }
}
export default { getAllPokemon, adoptPokemon }