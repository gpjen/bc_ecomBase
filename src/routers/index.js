const express = require('express')
const router = express.Router()

const {
    getUsers,
    getOneUser,
    addUsers
} = require('../controllers/users')

router.get('/users', getUsers)
router.get('/users/:id', getOneUser)
router.post('/users', addUsers)


module.exports = router