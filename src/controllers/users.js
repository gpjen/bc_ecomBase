const {
    users,
    profile,
    products
} = require('../../models')


exports.getUsers = async (req, res) => {
    try {
        const data = await users.findAll({
            include: [{
                    model: profile,
                    as: "profile",
                    attributes: {
                        exclude: ['id', 'createdAt', 'updatedAt']
                    }
                },
                {
                    model: products,
                    as: "products",
                    attributes: {
                        exclude: ['id', 'createdAt', 'updatedAt']
                    }
                }
            ],
            attributes: {
                exclude: ['password', 'createdAt', 'updatedAt']
            }
        })

        res.status(200).json({
            status: 'success',
            data
        })
    } catch (error) {
        res.status(400).json({
            status: 'failed get users',
            error
        })
    }
}

exports.getOneUser = async (req, res) => {
    try {
        const {
            id
        } = req.params

        const data = await users.findOne({
            where: {
                id
            },
            include: {
                model: profile,
                as: "profile",
                attributes: {
                    exclude: ['id', 'createdAt', 'updatedAt']
                }
            },
            attributes: {
                exclude: ['password', 'createdAt', 'updatedAt']
            }
        })
        res.status(200).json({
            status: 'success',
            data
        })
    } catch (error) {
        res.status(400).json({
            status: 'failed get one users profile',
            error
        })
    }
}