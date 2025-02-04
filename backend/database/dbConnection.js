const mongoose = require("mongoose")
require("dotenv").config()
const dbConnection = mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Server is connected to database")
}).catch((err) => {
    console.log(err)
})

module.exports = dbConnection