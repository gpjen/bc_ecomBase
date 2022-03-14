const {
    users
} = require('../../models')
const Joi = require("joi")

exports.registerUser = async (req, res) => {
    try {
        const data = req.body

        //-- VALIDASI DATA INPUT
        const schema = Joi.object({
            name: Joi.string().min(3).required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required()
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
            message: error.details[0].message,
        })

        //-- CHECK EMAIL PASSWORD



        //-- RESPONS



    } catch (error) {
        res.status(500).json({
            status: 'failed',
            error
        })
    }
}