//import mysql = require('mysql');
import query = require('./query')

//var con = mysql.createConnection({
//    host: "localhost",
//    user: "root",
//    password: "password",
//    database: "World"
//});

//con.connect(function (err) {
//    if (err) console.log(err);
//    else console.log("Connected!");
//    var sql = query.tables
//    con.query(sql[0], function (err) {
//        if (err) console.log(err)
//        else con.query(sql[1], function (err) {
//            if (err) console.log(err)
//            else con.query(sql[2], function (err) {
//                if (err) console.log(err)
//                else console.log("Tables Done")
//            })
//        })
//    })
//});

//export {
//    con as connection
//}

const dbConfig = require("./db.config");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    port: dbConfig.port,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

async function entry() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        const tables = query.tables;
        for (var table of tables) {
            await sequelize.query(table)
        }
        console.log('Tables done')
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
entry()

export {
    sequelize as connection
}