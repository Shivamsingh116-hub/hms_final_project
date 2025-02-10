const { feedbackModel, queryModel } = require("../database/queryData")

const addQuery = async (req, res) => {
    const { username, query, name } = req.body
    try {
        const response = await queryModel.create({ username: username, query: query, name: name })
        if (response) {
            return res.json({ message: "Query added" })
        } else {
            return res.json({ message: "Query not added" })
        }
    } catch (e) {
        return res.json({ message: e.message })
    }
}
const addFeedback = async (req, res) => {
    const { username, feedback, name } = req.body
    try {
        const response = await feedbackModel.create({ username: username, feedback: feedback, name: name })
        if (response) {
            return res.json({ message: "Feedback added" })
        } else {
            return res.json({ message: "Feedback not added" })
        }
    } catch (e) {
        return res.json({ message: e.message })
    }
}
const getFeedbackData = async (req, res) => {
    try {
        const response = await feedbackModel.find().sort({ _id: -1 }).limit(10)
        return res.json({ feedbackData: response })
    } catch (e) {
        return res.json({ message: e.message })
    }
}
module.exports = { addQuery, addFeedback, getFeedbackData }