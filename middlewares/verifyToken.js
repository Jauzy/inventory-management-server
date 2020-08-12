require("dotenv").config()
const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {
    const token = req.headers.token.split(" ")
    if (token[0] == "RPLGDC") {
        jwt.verify(token[1], process.env.SECRETKEY, function (err, decoded) {
            if (err) console.log(err)
            else {
                req.user = {
                    email: decoded.email,
                    id: decoded.id,
                    type: decoded.type
                }
                next()
            }
        });
    } else {
        res.status(400).send({ message: "Invalid Token" })
    }
}

module.exports = verifyToken