import { NextFunction, Request, Response } from "express";
import { StatusCode } from "../3-models/status-codes";
import requestIp from "request-ip";
import { cyber } from "../2-utils/cyber";
import { UnauthorizedError } from "../3-models/client-errors";

// npm i request-ip
// npm i @types/request-ip -D

class SecurityMiddleware {

    public validateLoggedIn(request: Request, response: Response, next: NextFunction): void {

        // Get authorization token. If exists, the value will be: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJmaXJzdE5hbWUiOiJCYXJ0IiwibGFzdE5hbWUiOiJTaW1wc29uIiwiZW1haWwiOiJiYXJ0QGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiMTIzNCIsInJvbGVJZCI6Mn0sImlhdCI6MTcwNzMyNjM4OCwiZXhwIjoxNzA3MzQ0Mzg4fQ.x04D3fHfcGQadJ2Y_Bp6hUIDTHMkBJgD9e81cw05FXI"
        //                                                                ^
        //                                                         01234567
        const header = request.header("authorization");

        // Extract token: 
        const token = header?.substring(7);

        // If token valid: 
        if(cyber.isTokenValid(token)) {
            next();
        }
        else { // Token is not valid
            const err = new UnauthorizedError("You are not logged-in.");
            next(err);
        }        
    }

    public validateAdmin(request: Request, response: Response, next: NextFunction): void {

        // Get authorization token. If exists, the value will be: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJmaXJzdE5hbWUiOiJCYXJ0IiwibGFzdE5hbWUiOiJTaW1wc29uIiwiZW1haWwiOiJiYXJ0QGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiMTIzNCIsInJvbGVJZCI6Mn0sImlhdCI6MTcwNzMyNjM4OCwiZXhwIjoxNzA3MzQ0Mzg4fQ.x04D3fHfcGQadJ2Y_Bp6hUIDTHMkBJgD9e81cw05FXI"
        //                                                                ^
        //                                                         01234567
        const header = request.header("authorization");

        // Extract token: 
        const token = header?.substring(7);

        // If user is Admin: 
        if(cyber.isAdmin(token)) {
            next();
        }
        else { // User is not Admin
            const err = new UnauthorizedError("You are not authorized.");
            next(err);
        }
    }

    public blackList(request: Request, response: Response, next: NextFunction): void {

        // Some black list IPs:
        const blackListIPs = ["150.70.6.8", "180.3.2.5"];

        // Get user IP address: 
        const userIP = requestIp.getClientIp(request);

        // If user is in the black list:
        if (blackListIPs.includes(userIP)) {
            // Block user:
            response.status(StatusCode.Unauthorized).send("You are not authorized!");
        }
        else {
            // Continue the request forward:
            next();
        }
    }

    // When to count route as rate limit and when to ignore:
    public skipRateLimit(request: Request, response: Response): boolean {
        return request.originalUrl.startsWith("/api/products/images/");
    }

}

export const securityMiddleware = new SecurityMiddleware();
