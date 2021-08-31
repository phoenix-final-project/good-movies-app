const jwt = require("jsonwebtoken")

// JWT Token Issuer
exports.generateToken = async (user) => {

    const payload = {
        id: user._id,
        iat: Date.now()
    }

    return await jwt.sign(payload, process.env.SECRET,  {expiresIn: '1h' })
}