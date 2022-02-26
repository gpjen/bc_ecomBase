const express = require('express')
const router = express.Router()

const {
    getProfile,
    getOneProfile,
    addProfile
} = require('../controllers/profile')

router.get('/profile', getProfile)
router.get('/profile/:id', getOneProfile)
router.post('/profile', addProfile)



const {
    getUsers,
    getOneUser
} = require('../controllers/users')

router.get('/users', getUsers)
router.get('/users/:id', getOneUser)


module.exports = router