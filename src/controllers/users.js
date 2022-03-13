const {
    users,
    profile,
    products,
    transactions
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
                },
                // {
                //     model: transactions,
                //     as: 'transaction',
                //     attributes: {
                //         exclude: ['createdAt', 'updatedAt']
                //     }
                // }
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
            include: [{
                    model: profile,
                    as: "profile",
                    attributes: {
                        exclude: ['idUser', 'id', 'createdAt', 'updatedAt']
                    }
                },
                {
                    model: products,
                    as: "products",
                    attributes: {
                        exclude: ['idUser', 'id', 'createdAt', 'updatedAt']
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
            status: 'failed get one users profile',
            error
        })
    }
}

exports.addUsers = async (req, res) => {
    const data = req.body

    try {
        const cekData = await users.findAll({
            where: {
                email: req.body.email
            }
        })

        if (!cekData) {
            const addData = await users.create(data)
            res.status(200).json({
                status: "success",
                message: "add users",
                result: addData
            })
        } else {
            res.status(200).json({
                status: "failed",
                message: "email conflict"
            })
        }
    } catch (error) {
        res.status(400).json({
            status: "failed",
            error
        })
    }

}

exports.updateUsers = async (req, res) => {
    const {
        id
    } = req.params
    const data = req.body

    try {
        const updateData = await users.update(data, {
            where: {
                id
            }
        })

        res.status(200).json({
            ststus: "success",
            result: updateData
        })
    } catch (error) {
        res.status(400).json({
            ststus: 'failed',
            error
        })
    }


}

exports.delUsers = async (req, res) => {
    const {
        id
    } = req.params
    try {
        const delData = await users.destroy({
            where: {
                id
            }
        })

        res.status(200).json({
            status: "success",
            result: delData
        })
    } catch (error) {
        res.status(400).json({
            ststus: 'failed',
            error
        })
    }
}