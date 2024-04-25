"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "password",
    DB: "World",
    port: 3306,
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
//# sourceMappingURL=db.config.js.map