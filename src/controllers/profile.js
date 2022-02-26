const {
    profile,
    user
} = require('../../models')


exports.getProfile = async (req, res) => {
    try {
        const data = profile.findAll({
            include: {
                as: user,
                model: user,
                atributes: {
                    exclude: ['password', 'createdAt', 'updatedAt']
                }
            },
            atributes: {
                exclude: ['createdAt', 'updateAt']
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