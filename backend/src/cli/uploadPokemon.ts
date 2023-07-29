import { pokemonData } from "./pokemonData"
import Pokemon from "../models/pokemon"
import connectToDatabase from "../db"
import "../config"

const uploadPokemonToDatabase = async () => {
    try {
        await connectToDatabase()
        for (const data of pokemonData) {
            await Pokemon.create(data);
        }
        console.log("Pokemon loaded successfully to the database");
        process.exit(0)
    } catch (err: any) {
        console.error("Error loading Pokemon to the database:", err.message);
        process.exit(1)
    }
}

uploadPokemonToDatabase();