const {
    transactions,
    users,
    products
} = require('../../models')

//-- ADD TRANSACTIONS (CREATE)


//-- GET TRANSACTIONS (READ)
exports.getTransactions = async (req, res) => {
    try {
        const getData = await transactions.findAll({
            include: [{
                    model: users,
                    as: "buyer",
                    attributes: {
                        exclude: ['password', 'createdAt', 'updatedAt']
                    }
                },
                {
                    model: users,
                    as: "seller",
                    attributes: {
                        exclude: ['password', 'createdAt', 'updatedAt']
                    }
                },
                {
                    model: products,
                    as: 'product',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    }
                }
            ],
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        })

        res.status(200).json({
            status: 'success',
            data: getData
        })
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        })
    }
}

//-- GET TRANSACTIONS BY ID (READ)
exports.getOneTransactions = async (req, res) => {
    const {
        id
    } = req.params

    try {
        const data = await transactions.findOne({
            where: {
                idBuyer: id
            },
            include: [{
                    model: users,
                    as: 'buyer',
                    attributes: {
                        exclude: ['password', 'createdAt', 'updatedAt']
                    }
                },
                {
                    model: users,
                    as: 'seller',
                    attributes: {
                        exclude: ['password', 'createdAt', 'updatedAt']
                    }
                }
            ],
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        })

        if (!data) {
            res.status(400).json({
                status: 'failed',
                message: 'no data'
            })
        } else {
            res.status(200).json({
                status: 'success',
                data
            })
        }

    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        })
    }
}

//-- UPDATE TRANSACTIONS (UPDATE)

//-- HARD DELETE TRANSACTIONS (DELETE)