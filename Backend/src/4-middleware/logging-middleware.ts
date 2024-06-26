import { NextFunction, Request, Response } from "express";

class LoggingMiddleware {

    public logToConsole(request: Request, response: Response, next: NextFunction): void {

        // Log request:
        console.log("Method: ", request.method);
        console.log("Route: ", request.originalUrl);
        console.log("Body: ", request.body);

        // Continue the request forward:
        next();
    }

}

export const loggingMiddleware = new LoggingMiddleware();
