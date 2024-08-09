import express, { Request, Response } from 'express'
const router = express.Router()
import { addRestaurant, deleteRestaurant, getRestaurants, getWithInRange, login, rateRestaurant, register, updateRestaurant } from './apis/index'


// user route
router.post('/login', login)
router.post('/register', register)

// restaurant routes
router.post('/restaurant/', addRestaurant)
router.delete('/restaurant/:id', deleteRestaurant)
router.post('/restaurant/rate', rateRestaurant)
router.get('/restaurant/', getRestaurants)
router.get('/restaurant/range', getWithInRange)
router.put('/restaurant/:id', updateRestaurant)


export default router