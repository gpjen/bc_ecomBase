const {
    category,
    products
} = require('../../models')

exports.getCategory = async (req, res) => {
    const data = await category.findAll({
        include: {
            model
        }
    })
}