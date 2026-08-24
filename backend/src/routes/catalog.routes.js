const express = require('express')
const { listRestaurants, getRestaurant } = require('../controllers/catalog.controller')

const router = express.Router()
router.get('/restaurants', listRestaurants)
router.get('/restaurants/:id', getRestaurant)

module.exports = router
