const express = require("express")
const dbConnection = require("./database/dbConnection")
const CORS = require('cors')
const userRouter = require("./routes/userRoutes")
const doctorRouter = require("./routes/doctorRoutes")
const pharmacistRoute = require("./routes/pharmacistRoute")
const app = express()
const http = require('http')
// const { Server } = require('socket.io')
// const registrationModel = require("./database/userRegistrationData")
// const { userContactModel } = require("./database/contactSchema")
const server = http.createServer(app)
app.use(express.json())
require("dotenv").config()
app.use(CORS(
    {
        origin: [process.env.FRONTEND_URL, process.env.LOCALHOST_URL],
        methods: ["GET", "PUT", "POST", "DELETE"],
        credentials:true
    }
))
app.use(userRouter)
app.use(doctorRouter)
app.use(pharmacistRoute)
app.get('/', (req, res) => {
    res.send("WORKING")
})

server.listen(process.env.PORT, () => {
    console.log(`Server is running on ${process.env.PORT}`)
})