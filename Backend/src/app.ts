import express, { Express } from "express";
import { productsRouter } from "./6-controllers/products-controller";
import { appConfig } from "./2-utils/app-config";
import { loggingMiddleware } from "./4-middleware/logging-middleware";
import { securityMiddleware } from "./4-middleware/security-middleware";
import { errorsMiddleware } from "./4-middleware/errors-middleware";
import { authRouter } from "./6-controllers/auth-controller";
import expressFileUpload from "express-fileupload";
import { fileSaver } from "uploaded-file-saver";
import cors from "cors";
import expressRateLimit from "express-rate-limit";

import path from "path";
import fs from "fs"; // File System
import https from "https";

class App {

    // Express server:
    private server: Express;

    // Starting code: 
    public start(): void {

        // Configure file saver regarding which folder to save all images:
        fileSaver.config(path.join(__dirname, "1-assets", "images"));

        // Create server: 
        this.server = express();

        // Prevent DoS attack: 
        this.server.use(expressRateLimit({
            windowMs: 1000, // Window Milliseconds to count
            limit: 10, // How many request allowed in that window.
            skip: securityMiddleware.skipRateLimit
        }));

        // Enable CORS:
        this.server.use(cors());

        // Tell express to create request.body from the given json:
        this.server.use(express.json());

        // Tell express to create request.files containing uploaded files:
        this.server.use(expressFileUpload());

        // Register middleware:
        this.server.use(loggingMiddleware.logToConsole);
        this.server.use(securityMiddleware.blackList); // The Black List

        // Register routes: 
        this.server.use("/", authRouter, productsRouter);

        // Register route not found middleware:
        this.server.use(errorsMiddleware.routeNotFound);

        // Register error middleware: 
        this.server.use(errorsMiddleware.catchAll);

        // Listen on HTTP in development:
        if (appConfig.isDevelopment) {
            this.server.listen(appConfig.port, () => console.log("Listening on http://localhost:" + appConfig.port));
            return;
        }

        // Listen on HTTPS in production: 
        const options = {
            cert: fs.readFileSync(path.join(__dirname, "1-assets", "cert", "localhost-2024-02-18-190931.cer")),
            key: fs.readFileSync(path.join(__dirname, "1-assets", "cert", "localhost-2024-02-18-190931.pkey")),
        };

        const httpsServer = https.createServer(options, this.server);
        httpsServer.listen(appConfig.port, () => console.log("Listening on https://localhost:" + appConfig.port));
    }
}

const app = new App();
app.start();

