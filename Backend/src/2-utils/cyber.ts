import { UserModel } from "../3-models/user-model";
import jwt, { SignOptions } from "jsonwebtoken";
import { appConfig } from "./app-config";
import { RoleModel } from "../3-models/role-model";
import crypto from "crypto";

class Cyber {

    // Create new token:
    public getNewToken(user: UserModel): string {

        // Remove password from the user object: 
        delete user.password;

        // Create container for the user:
        const container = { user };

        // Options:
        const options: SignOptions = { expiresIn: "5h" };

        // Create token:
        const token = jwt.sign(container, appConfig.jwtSecretKey, options);

        // Return:
        return token;
    }

    // Validate token:
    public isTokenValid(token: string): boolean {
        try {

            // If no token sent: 
            if (!token) return false;

            // Verify token (throws if failed):
            jwt.verify(token, appConfig.jwtSecretKey);

            // All is good - token is valid:
            return true;
        }
        catch (err: any) {
            return false;
        }
    }

    // Validate admin:
    public isAdmin(token: string): boolean {

        // Extract container:
        const container = jwt.decode(token) as { user: UserModel }; // Casting

        // Extract user: 
        const user = container.user;

        // Return true if user is admin or false if user is not admin: 
        return user?.roleId === RoleModel.Admin;
    }

    // Hash password: 
    public hashPassword(plainText: string): string {

        // SHA = Secure Hashing Algorithm
        // HEX = Converting to string.
        const hashedPassword = crypto.createHmac("sha512", appConfig.passwordSalt).update(plainText).digest("hex");

        return hashedPassword;
    }

}

export const cyber = new Cyber();
