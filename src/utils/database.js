
const mongoose = require('mongoose')

async function databaseConnect() {

    let databseURL = process.env.DATABASE_URL || "mongodb://localhost:27017/blogcaDB"

    await mongoose.connect(databseURL)
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