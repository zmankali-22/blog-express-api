
const mongoose = require('mongoose')

async function databaseConnect() {

    let databseURL = process.env.DATABASE_URL || "mongodb://localhost:27017/blogcaDB"

    await mongoose.connect(databseURL)
    console.log("Connected to database successfully")
}

module.exports = {
    databaseConnect,
}