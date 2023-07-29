import winston from "winston";
import path from "path"
import fs from "fs"

const logDir = path.join(__dirname, "../../logs");
if (!fs.existsSync(logDir)) {
    try {
        fs.mkdirSync(logDir);
    } catch (error) {
        console.log("Error in creating logs directory")
        console.error(error)
        process.exit(1);
    }
}
const { combine, timestamp, prettyPrint } = winston.format;
const logger = winston.createLogger({
    level: "info",
    format: combine(timestamp(), prettyPrint()),
    transports: [
        new winston.transports.File({ filename: path.join(logDir, "info.log"), level: "info" }),
        new winston.transports.File({ filename: path.join(logDir, "error.log"), level: "error" }),
        new winston.transports.Console()
    ]
})

export default logger
