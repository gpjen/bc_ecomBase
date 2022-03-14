const {
    users
} = require('../../models')
const {
    Op
} = require('sequelize')
const Joi = require("joi")


exports.registerUser = async (req, res) => {
    try {
        const data = req.body

        //-- VALIDASI DATA INPUT
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

        //-- CKECK EMAIL
        const check = await users.findOne({
            where: {
                email: data.email
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'password']
            }
        })

        if (check) return res.status(200).json({
            status: 'failed',
            message: 'email already exist'
        })

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
    try {
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

        //-- CHECK EMAIL PASSWORD
        const findUser = await users.findOne({
            where: {
                [Op.and]: {
                    email: data.email,
                    password: data.password
                }
            }
        })

        if (!findUser) return res.status(400).json({
            status: 'failed',
            message: 'email and password invalid'
        })

        //-- RESPONS
        res.status(200).json({
            status: 'success',
            data: findUser
        })

    } catch (error) {
        res.status(500).json({
            status: 'failed',
            error
        })
    }
}