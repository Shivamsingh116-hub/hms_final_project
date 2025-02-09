const mongoose = require("mongoose")
const userContactSchema = new mongoose.Schema(
    {
        phoneNumber: {
            type: String,
            unique: true,
            required: true
        },
        socketId: {
            type: String
        }
    }
)
const userContactModel = mongoose.model('contactData', userContactSchema)

const messageSchema = new mongoose.Schema({
    sender: {
        type: String
    },
    receiver: {
        type: String
    },
    message: {
        String
    },
    timestamp: { type: Date, default: Date.now },
    delivered: { type: Boolean, default: false }
})

const messageModel = mongoose.model("messageData", messageSchema)
module.exports = {messageModel,userContactModel}