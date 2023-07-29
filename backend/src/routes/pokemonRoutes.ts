import { Router } from "express";
import pokemonController from "../controllers/pokemonController";

const routes = Router();

routes.get("/", pokemonController.getAll)
routes.post("/adopt/:id", pokemonController.adoptPokemon)

export default routes