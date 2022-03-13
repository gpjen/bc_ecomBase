const {
    products,
    users,
    transactions,
    category,
    categoryproduct
} = require('../../models')

//-- ADD PRODUCT (CREATE)
exports.addProducts = async (req, res) => {
    const data = req.body

    try {
        const addData = products.create(data)
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

// GET PRODUCT (READ)
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
            data
        })
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            message: 'failed get products',
            error
        })
    }
}

//-- GET PRODUCT BY ID (READ)
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

//-- UPDATE PRODUCT BY ID (UPDATE)
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

//-- HARD DELETE PRODUCT -single -multiple BY ID (DELETE)
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