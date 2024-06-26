import fsPromises from "fs/promises";

class Logger {

    public async logError(err: any): Promise<void> {

        const now = new Date();

        let msg = now + "\n";
        msg += err.message + "\n";
        msg += "-----------------------------------------------------\n";

        await fsPromises.appendFile("./errors.log", msg);

    }

}

export const logger = new Logger();
