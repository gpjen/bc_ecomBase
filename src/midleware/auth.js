const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.auth = async (req, res, next) => {

    const authHeader = req.header('Authorization')
    const token = authHeader && authHeader.split(" ")[1]

    if (!token) return res.status(200).json({
        status: 'failed',
        message: 'access denied'
    })

    try {
        const verified = jwt.verify(token, process.env.DT_SECRET_KEY)
        req.user = verified
        next()

    } catch (error) {
        res.status(500).json({
            status: 'failed',
            message: 'invalid token'
        })
    }
}