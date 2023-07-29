import dotenv from "dotenv"
import path from "path"

const setupEnv = () => {
    if (process.env.NODE_ENV)
        dotenv.config({
            path: path.join(__dirname, `../.env.${process.env.NODE_ENV}.local`),
            override: true
        })
}
dotenv.config()
setupEnv();

const PORT = process.env.PORT;

if (!PORT) {
    console.error("Error: PORT is undefined in the environment variables.")
    process.exit(1);
}

export { PORT }