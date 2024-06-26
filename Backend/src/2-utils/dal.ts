import mysql, { QueryError } from "mysql2";
import { appConfig } from "./app-config";

class DAL {

    // A Connection object which can send commands to the database:
    private readonly connection = mysql.createPool({
        host: appConfig.mysqlHost,
        user: appConfig.mysqlUser,
        password: appConfig.mysqlPassword,
        database: appConfig.mysqlDatabase
    });

    // Executing a sql on the database:
    public execute(sql: string, values?: any[]): Promise<any> {
        return new Promise<any>((resolve, reject) => { // To Promisify async code.
            this.connection.query(sql, values, (err: QueryError, result: any) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
    }

}

export const dal = new DAL();
