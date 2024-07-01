
const mongoose = require('mongoose')

const dotenv = require("dotenv");
dotenv.config();

async function databaseConnect() {

    let databaseURL = process.env.DATABASE_URL || "mongodb://localhost:27017/blogcaDB"

    await mongoose.connect(databaseURL)
    console.log("Connected to database successfully")
}


async function databaseClose () {
    await mongoose.connection.close()
    console.log("Database connection closed")

}

async function databaseClear() {
    await mongoose.connection.db.dropDatabase()
    console.log("Database cleared")
}

module.exports = {
    databaseConnect,
    databaseClose,
    databaseClear,
}