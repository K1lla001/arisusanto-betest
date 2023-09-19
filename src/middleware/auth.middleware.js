const jwt = require('jsonwebtoken')
const {commonResponse} = require("../response/commonResponse");

const secretKey = process.env.SECRET_KEY
const expiresIn = '1h'

const generateToken = (username) => {
    const token = jwt.sign({username}, secretKey, {expiresIn})

    return token
}

const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization

    if (!token || !token.startsWith("Bearer ")) {
        return commonResponse(res, 401, "Unauthorized, You are not allowed here!", null)
    }

    const tokenValue = token.split("Bearer ")[1];

    jwt.verify(tokenValue, secretKey, (err, user) => {
        if(err) return commonResponse(res, 403, "Forbidden, You are not allowed here!", null)

        req.user = user
        next()
    })


}

module.exports = {authenticateToken, generateToken}