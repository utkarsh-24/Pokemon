import { Router } from "express";
import authController from "../controllers/authController";

const routes = Router();

routes.post("/login", authController.login)
routes.post("/signup", authController.signup)

export default routes