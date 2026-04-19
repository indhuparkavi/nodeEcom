/* Loading the environment variables from the appropriate environment file. */
// import { config as configDotenv } from "dotenv";
// import { resolve } from "path";

const { config } = require("dotenv");
const { resolve } = require("path");

switch (process.env.NODE_ENV) {
    case "local":
        console.log("1.ExpenseTracker Backend: Environment is 'local'");
        config({
            path: resolve(__dirname, "../../.env.local"),
        });
        break;
    default:
        throw new Error(`'NODE_ENV' ${process.env.NODE_ENV} is not handled!`);
}
