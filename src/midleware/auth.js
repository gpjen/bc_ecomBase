//-- IMPORT PACKEGE
const jwt = require('jsonwebtoken')
require('dotenv').config()

//-- EXPORTS AUTH
exports.auth = async (req, res, next) => {

    //-- GET HEADER AUTHORIZATION

    const authHeader = req.header('Authorization')
    const token = authHeader && authHeader.split(" ")[1]

    //-- CHECKING TOKEN

    if (!token) return res.status(200).json({
        status: 'failed',
        message: 'access denied'
    })

    try {
        //-- VERTIFY TOKEN
        const verified = jwt.verify(token, process.env.DT_SECRET_KEY)
        req.user = verified
        next()

    } catch (error) {
        //-- ERROR HANDLING INVALID TOKEN
        res.status(500).json({
            status: 'failed',
            message: 'invalid token'
        })
    }
}