const {
    profile,
    users
} = require('../../models')


exports.getProfile = async (req, res) => {
    try {
        const data = await profile.findAll({
            include: {
                model: users,
                as: "users",
                attributes: {
                    exclude: ['id', 'password', 'createdAt', 'updatedAt']
                }
            },
            attributes: {
                exclude: ['idUser', 'createdAt', 'updatedAt']
            }
        })

        res.status(200).json({
            status: 'success',
            data
        })
    } catch (error) {
        res.status(400).json({
            status: 'failed getProducts',
            error
        })
    }
}

exports.getOneProfile = async (req, res) => {
    try {
        const {
            id
        } = req.params
        const data = await profile.findOne({
            include: {
                model: users,
                as: "users",
                attributes: {
                    exclude: ['id', 'password', 'createdAt', 'updatedAt']
                }
            },
            attributes: {
                exclude: ['idUser', 'createdAt', 'updatedAt']
            },
            where: {
                id
            }
        })

        res.status(200).json({
            status: 'success',
            data
        })
    } catch (error) {
        res.status(400).json({
            status: 'failed get one profile',
            error
        })
    }
}

exports.addProfile = async (req, res) => {
    try {
        const data = req.body
        const addProfile = profile.create(data)

        res.status(200).json({
            status: 'add profile success',
            addProfile
        })
    } catch (error) {
        res.status(400).json({
            status: 'failed add data',
            error
        })
    }

}