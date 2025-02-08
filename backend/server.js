const express = require("express")
const dbConnection = require("./database/dbConnection")
const CORS = require('cors')
const userRouter = require("./routes/userRoutes")
const doctorRouter = require("./routes/doctorRoutes")
const pharmacistRoute = require("./routes/pharmacistRoute")
const app = express()
const http = require('http')
const { Server } = require('socket.io')
const server = http.createServer(app)
app.use(express.json())
require("dotenv").config()
app.use(CORS())
app.use(userRouter)
app.use(doctorRouter)
app.use(pharmacistRoute)
app.get('/', (req, res) => {
    res.send("WORKING")
})
const io = new Server(server, {
    cors: { origin: "*" }
})
const users = {}
io.on("connection", (socket) => {
    console.log("user id", socket.id);
    socket.on("register", (phoneNumber) => {
        users[phoneNumber] = socket.id
    })
    socket.on("sendMessage", ({ to, message }) => {
        console.log(users)
        let recieverSocketId = users[to]
        if (recieverSocketId) {
            io.to(recieverSocketId).emit('receiveMessage', message)
        } else {
            socket.emit("error", "Currently Doctor not available...")
        }
    })
    socket.on("disconnect", () => {
        for (const phone in users) {
            if (users[phone] === socket.id) {
                delete users[phone]
                break;
            }
        }
        console.log("User disconnected:", socket.id);
    })
})
server.listen(process.env.PORT, () => {
    console.log(`Server is running on ${process.env.PORT}`)
})