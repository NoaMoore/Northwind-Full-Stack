import { OkPacketParams } from "mysql2";
import { UserModel } from "../3-models/user-model";
import { dal } from "../2-utils/dal";
import { RoleModel } from "../3-models/role-model";
import { cyber } from "../2-utils/cyber";
import { CredentialsModel } from "../3-models/credentials-model";
import { UnauthorizedError, ValidationError } from "../3-models/client-errors";

class AuthService {

    // Register new user:
    public async register(user: UserModel): Promise<string> {

        // Validate:

        // // Is email taken:
        // const isTaken = await this.isEmailTaken(user.email);
        // if(isTaken) throw new ValidationError("Email already taken.");

        // Set role as User: 
        user.roleId = RoleModel.User;

        // Hash password: 
        user.password = cyber.hashPassword(user.password);

        // Create sql: 
        // const sql = `INSERT INTO users(firstName, lastName, email, password, roleId)
        //              VALUES('${user.firstName}','${user.lastName}','${user.email}','${user.password}',${user.roleId})`;

        // Create prepared statement:
        const sql = "INSERT INTO users(firstName, lastName, email, password, roleId) VALUES(?,?,?,?,?)";

        // Create values: 
        const values = [user.firstName, user.lastName, user.email, user.password, user.roleId];

        // Execute: 
        const info: OkPacketParams = await dal.execute(sql, values);

        // Set back id: 
        user.id = info.insertId;

        // Create token:
        const token = cyber.getNewToken(user);

        // Return: 
        return token;
    }

    // Login existing user:
    public async login(credentials: CredentialsModel): Promise<string> {

        // Validate:

        // Hash password:
        credentials.password = cyber.hashPassword(credentials.password);

        // Create sql: 
        //const sql = `SELECT * FROM users WHERE email = '${credentials.email}' AND password = '${credentials.password}'`;

        // Create prepared statement:
        const sql = "SELECT * FROM users WHERE email = ? AND password = ?";

        // Create values array: 
        const values = [credentials.email, credentials.password];

        // Execute: 
        const users = await dal.execute(sql, values);

        // Extract given user: 
        const user = users[0];

        // If no such user:
        if(!user) throw new UnauthorizedError("Incorrect email or password");

        // Create token:
        const token = cyber.getNewToken(user);

        // Return: 
        return token;
    }

    // // Check in the db if email already exist:
    // private async isEmailTaken(email: string): Promise<boolean> {
        
    // }

}

export const authService = new AuthService();
