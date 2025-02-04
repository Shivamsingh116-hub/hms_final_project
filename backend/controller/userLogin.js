const registrationModel = require("../database/userRegistrationData")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcryptjs')
require("dotenv").config()
const userRegistration = async (req, res) => {
    const { username, name, contact, password, email, role } = req.body
    const hashPassword = async (password) => {
        const saltRounds = await bcrypt.genSalt(12)
        const hashedPassword = await bcrypt.hash(password, saltRounds)
        return hashedPassword
    }
    const securePassword = await hashPassword(password)
    try {
        const usernameExist = await registrationModel.findOne({ username: username })
        if (usernameExist) {
            return res.json({ message: "Username already exist!PLease fill another username" })
        }
        const contactExist = await registrationModel.findOne({ contact: contact })
        if (contactExist) {
            return res.json({ message: "Contact already exist!PLease fill another cntact" })
        }
        const createUser = await registrationModel.create({ username: username, password: securePassword, contact: contact, name: name, email: email, role: role })
        if (createUser) {
            return res.json({ message: "User registration successfully", is_signin: true })
        }
    } catch (e) {
        return res.json({ err: e.message })
    }
    res.send("recieved")
}
const verifyUser = async (req, res) => {
    const { username, password } = req.body
    const unhashPassword = async (password, hashPassword) => {
        const unhashPass = await bcrypt.compare(password, hashPassword)
        return unhashPass
    }
    const generateToken = async (username, role, contact, name, email) => {
        const token = await jwt.sign({ username: username, role: role, contact: contact, name: name, email: email }, process.env.JWT_SECRET_KEY)
        return token
    }
    try {
        const usernameExist = await registrationModel.findOne({ username: username })
        if (usernameExist) {
            const verify = await unhashPassword(password, usernameExist.password)
            if (verify) {
                const token = await generateToken(username, usernameExist.role, usernameExist.contact, usernameExist.name, usernameExist.email)
                return res.json({ message: "User login successfully", is_signin: true, Token: token })
            } else {
                return res.json({ message: "Password is invalid!Please fill correct password" })
            }
        } else {
            return res.json({ message: "Username is invalid! Please fill correct username" })
        }
    } catch (e) {
        return res.json({ message: e.message })
    }
}
const userProtected = async (req, res) => {
    res.json({ userData: req.query.token })
    if (req.query.message) {
        res.json({ message: req.query.message })
    }
}
module.exports = { userRegistration, verifyUser, userProtected }