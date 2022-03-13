const express = require('express')
const router = express.Router()


//users---------------------------------------------------
const {
    getUsers,
    getOneUser,
    addUsers,
    updateUsers,
    delUsers,

} = require('../controllers/users')

router.get('/users', getUsers)
router.get('/users/:id', getOneUser)
router.post('/users', addUsers)
router.patch('/users/:id', updateUsers)
router.delete('/users/:id', delUsers)

//products-----------------------------------------------
const {
    getProducts,
    getOneProducts,
    addProducts,
    updateProducts,
    delProducts
} = require('../controllers/products')

router.get('/product', getProducts)
router.get('/product/:id', getOneProducts)
router.post('/product', addProducts)
router.patch('/product/:id', updateProducts)
router.delete('/product', delProducts)

const {
    getTransactions,
    getOneTransactions
} = require('../controllers/transactions')

router.get('/transaction', getTransactions)
router.get('/transaction/:id', getOneTransactions)

module.exports = router