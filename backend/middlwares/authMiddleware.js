const jwt = require("jsonwebtoken")
const authenticationToken = async (req, res, next) => {

    const token = req.query.token
    if (!token || token === '') {
        return res.status(400).json({ message: "Token is required" });
    }
    try {
        const verifyToken = await jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.query.token = verifyToken
        next()
    } catch (e) {
        console.log(e)
        req.query.message = "Expire"
    }
}
module.exports = authenticationToken