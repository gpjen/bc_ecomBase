const express = require('express')
const router = express.Router()


const {
    auth
} = require('../midleware/auth')

//auth----------------------------------------------------
const {
    registerUser,
    loginUser
} = require('../controllers/auth')

router.post('/register', registerUser)
router.post('/login', loginUser)

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

router.get('/product', auth, getProducts)
router.get('/product/:id', getOneProducts)
router.post('/product', addProducts)
router.patch('/product/:id', updateProducts)
router.delete('/product', delProducts)

//-- transactions
const {
    getTransactions,
    getOneTransactions,
    addTransactions
} = require('../controllers/transactions')

router.get('/transaction', getTransactions)
router.get('/transaction/:id', getOneTransactions)
router.post('/transaction', addTransactions)

module.exports = router