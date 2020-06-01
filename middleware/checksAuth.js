const jwt = require("jsonwebtoken")
const keys = require("../configs/dev")

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, keys.JWT_KEY)
        req.userData = decoded;
        next()
    } catch {
        res.redirect("/")
    }
}

