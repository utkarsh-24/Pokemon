import { Router } from "express";
import petController from "../controllers/petController";

const routes = Router();

routes.get("/", petController.getPets)
routes.put("/feed/:id",petController.feedPet)

export default routes