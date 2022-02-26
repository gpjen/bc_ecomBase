const express = require('express')
const router = express.Router()

const {
    getProfile,
    getOneProfile
} = require('../controllers/profile')

router.get('/profile', getProfile)
router.get('/profile/:id', getOneProfile)


module.exports = router