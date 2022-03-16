const {
    users
} = require('../../models')
require('dotenv').config()
const Joi = require("joi")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


exports.registerUser = async (req, res) => {
    //-- VALIDASI DATA INPUT
    const data = req.body
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        confirmPass: Joi.ref('password')
    })
    const {
        error
    } = schema.validate(data)

    if (error) {
        return res.status(400).json({
            status: 'failed',
            message: error.details[0].message
        })
    }


    try {
        //-- CKECK EMAIL
        const newUser = await users.findOne({
            where: {
                email: data.email
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'password']
            }
        })

        if (newUser) return res.status(200).json({
            status: 'failed',
            message: 'email already exist'
        })

        //-- HASH PASSWORD
        const salt = await bcrypt.genSalt(10)
        data.password = await bcrypt.hash(data.password, salt)

        //-- CREATE DATA USERS
        data.status = 'buyer'
        users.create(data)
        res.status(200).json({
            status: 'success',
            message: 'register success'
        })
    } catch (error) {
        res.status(500).json({
            status: 'failed',
            error
        })
    }

}

exports.loginUser = async (req, res) => {
    const data = req.body

    //-- VALIDASI DATA INPUT
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    })

    const {
        error
    } = schema.validate(data)

    if (error) return res.status(400).json({
        status: 'failed',
        message: error.details[0].message
    })

    try {
        //-- CHECK EMAIL PASSWORD
        const findUser = await users.findOne({
            where: {
                email: data.email
            },
            // attributes: ['name', 'email']
        })

        if (!findUser) return res.status(400).json({
            status: 'failed',
            message: 'email and password doesnt match'
        })

        const validPass = await bcrypt.compare(data.password, findUser.password)

        if (!validPass) return res.status(400).json({
            status: 'failed',
            message: 'email and password doesnt match'
        })

        //-- CREATE DATA TOKEN JWT
        const datatToken = {
            id: findUser.id,
            email: findUser.email,
            status: findUser.status
        }
        const token = jwt.sign(datatToken, process.env.DT_SECRET_KEY)

        //-- RESPONS SUCCESS
        res.status(200).json({
            status: 'success',
            data: {
                name: findUser.name,
                email: findUser.email,
                token
            }
        })

    } catch (error) {
        res.status(500).json({
            status: 'failed',
            error
        })
    }
}