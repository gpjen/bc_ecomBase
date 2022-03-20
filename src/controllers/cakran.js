// const mhs = {
//     nama: "gandijen",
//     umur: 21,
//     ttl: "09-09-1995",
//     hobi: "ngoding",
//     menikah: false,
// }

// const mahsiswa = {
//     ...mhs
// }

// console.log(mahsiswa);


const {
    products,
    users,
    category,
    categoryproduct
} = require("../../models");

exports.getProduct = async (req, res) => {
    try {
        const data = await products.findAll({
            include: [{
                    model: users,
                    as: "user",
                    attributes: {
                        exclude: ["createdAt", "updatedAt", "password"],
                    },
                },
                {
                    model: category,
                    as: "categories",
                    through: {
                        model: categoryproduct,
                        as: "bridge",
                        attributes: [],
                    },
                    attributes: {
                        exclude: ["createdAt", "updatedAt"],
                    },
                },
            ],
            attributes: {
                exclude: ["createdAt", "updatedAt", "idUser"],
            },
        });

        res.send({
            status: "success...",
            data,
        });
    } catch (error) {
        console.log(error);
        res.send({
            status: "failed",
            message: "Server Error",
        });
    }
};

exports.addProduct = async (req, res) => {
    try {
        const {
            category: categoryName,
            ...data
        } = req.body;

        // code here
        const categoryData = await category.findOne({
            where: {
                name: categoryName,
            },
        });

        if (categoryData) {
            await categoryproduct.create({
                idCategory: categoryData.id,
                idProduct: newProduct.id,
            });
        } else {
            const newCategory = await category.create({
                name: categoryName
            });
            await categoryproduct.create({
                idCategory: newCategory.id,
                idProduct: newProduct.id,
            });
        }
        let productData = await products.findOne({
            where: {
                id: newProduct.id,
            },
            include: [{
                    model: users,
                    as: "user",
                    attributes: {
                        exclude: ["createdAt", "updatedAt", "password"],
                    },
                },
                {
                    model: category,
                    as: "categories",
                    through: {
                        model: categoryproduct,
                        as: "bridge",
                        attributes: [],
                    },
                    attributes: {
                        exclude: ["createdAt", "updatedAt"],
                    },
                },
            ],
            attributes: {
                exclude: ["createdAt", "updatedAt", "idUser"],
            },
        });

        // code here
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: "failed",
            message: "Server Error",
        });
    }
};