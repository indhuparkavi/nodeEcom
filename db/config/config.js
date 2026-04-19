require('dotenv').config();
/* Exporting the configuration for the database. */
module.exports = {
    "local": {
        "username": "postgres",
        "password": "kaviparkavi1",
        "database": "ecommerce",
        "host": "localhost",
        "dialect": "postgres",
        "port": "5432"
    },

}
