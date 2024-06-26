import { NextFunction, Request, Response } from "express";
import { StatusCode } from "../3-models/status-codes";
import { RouteNotFoundError } from "../3-models/client-errors";
import { appConfig } from "../2-utils/app-config";
import { logger } from "../2-utils/logger";

class ErrorsMiddleware {

    // Route not found: 
    public routeNotFound(request: Request, response: Response, next: NextFunction): void {

        // Create error: 
        const err = new RouteNotFoundError(request.originalUrl);

        // Navigate to catch all:
        next(err);
    }

    // Catch all:
    public catchAll(err: any, request: Request, response: Response, next: NextFunction): void {

        // Log error:
        console.log(err);

        // Log to file: 
        logger.logError(err);

        // Extract status code: 
        const status = err.status ? err.status : StatusCode.InternalServerError;

        // Extract error message: 
        const message = appConfig.isProduction && status === StatusCode.InternalServerError ? "Some error, please try again later." : err.message;

        // Response back the error:
        response.status(status).send(message);
    }

}

export const errorsMiddleware = new ErrorsMiddleware();
