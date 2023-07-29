import express, { NextFunction, Request, Response } from "express"
import { PORT } from "./config"
import connectToDatabase from "./db"
import authRoutes from "./routes/authRoutes";
import pokemonRoutes from "./routes/pokemonRoutes";
import petRoutes from "./routes/petRoutes";
import { beforeHandleRequest } from "./middleware/authMiddleware";
import ErrorHandler from "./utils/errorHandler";
import "./utils/cron"
import cors from "cors"

const app = express();
app.use(express.json())
app.use(cors())
app.use("/api", beforeHandleRequest)
app.use("/api/auth", authRoutes)
app.use("/api/pokemon", pokemonRoutes)
app.use("/api/pet",petRoutes);
app.use((req: Request, res: Response) => {
    return res.status(404).send({ success: false, message: "Page not found" })
})
app.use((err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
    return res.status(err.statusCode).send({ success: false, message: err.message })
})

app.listen(PORT, () => {
    console.log("server started at port = " + PORT)
    connectToDatabase()
})