const {
    products,
    users,
    transactions
} = require('../../models')

exports.getProducts = async (req, res) => {
    try {
        const data = await products.findAll({
            include: [{
                model: users,
                as: "user",
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