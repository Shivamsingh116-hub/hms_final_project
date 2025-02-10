
const mongoose = require('mongoose')
const querySchema = new mongoose.Schema({
    query: {
        type: String
    }, name: {
        type: String
    },
    username: {
        type: String,
    }, createdAt: {
        type: Date,
        default: Date.now
    }
})
const queryModel = mongoose.model("queryData", querySchema)

const feedbackSchema = new mongoose.Schema({
    feedback: {
        type: String
    },
    name: {
        type: String
    },
    username: {
        type: String,
    }, createdAt: {
        type: Date,
        default: Date.now
    }
})
const feedbackModel = mongoose.model("feedbackData", feedbackSchema)
module.exports = { feedbackModel, queryModel }