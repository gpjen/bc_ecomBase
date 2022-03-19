const {
    products,
    users,
    transactions,
    category,
    categoryproduct
} = require('../../models')

const Joi = require('joi')
const {
    number,
    string
} = require('joi')

//-- ADD PRODUCT (CREATE)
exports.addProducts = async (req, res) => {
    //VALIDASI DATA REQUEST
    const data = req.body
    const schema = Joi.object({
        name: Joi.string().min(1).required(),
        desc: Joi.string().allow(''),
        price: Joi.number().min(0).required(),
        image: Joi.string().allow(''),
        qty: Joi.number().max(999999).required(),
        idUser: Joi.number().required()
    })

    const {
        error
    } = schema.validate(data)

    if (error) return res.status(400).json({
        status: 'failed',
        message: error.details[0].message
    })

    try {
        const addData = await products.create(data)
        res.status(201).json({
            status: 'success',
            data: addData
        })
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        })
    }
}

//-- (READ) GET PRODUCT 
exports.getProducts = async (req, res) => {
    try {
        const data = await products.findAll({
            include: [{
                    model: users,
                    as: "user",
                    attributes: {
                        exclude: ['password', 'createdAt', 'updatedAt']
                    }
                },
                {
                    model: transactions,
                    as: 'transaction',
                    attributes: {
                        exclude: ['password', 'createdAt', 'updatedAt']
                    }
                },
                // {
                //     model: category,
                //     as: "category",
                //     through: {
                //         model: categoryproduct,
                //         as: 'bridge'
                //     }
                // }
            ],
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        })

        res.status(200).json({
            status: 'success',
            data,
        })
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            message: 'failed get products',
            error
        })
    }
}

//-- (READ) GET PRODUCT BY ID 
exports.getOneProducts = async (req, res) => {
    const {
        id
    } = req.params

    try {
        const data = await products.findAll({
            include: [{
                model: users,
                as: 'user',
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            }, {
                model: transactions,
                as: 'transaction',
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            }],
            where: {
                id
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        })

        res.status(200).json({
            status: 'success',
            data
        })
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        })
    }
}

//-- (UPDATE) POST PRODUCT BY ID 
exports.updateProducts = async (req, res) => {
    const {
        id
    } = req.params
    const data = req.body

    try {
        const updateData = products.update(data, {
            where: {
                id
            }
        })

        res.staus(201).json({
            status: 'success',
            data: updateData
        })
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        })
    }
}

//-- (DELETE) HARD DELETE PRODUCT -single -multiple BY ID 
exports.delProducts = async (req, res) => {
    try {
        const delData = products.destroy({
            where: {
                id
            },
        })

        res.status(201).json({
            status: 'success',
            data: delData
        })
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        })
    }
}