import express, { Request, Response } from 'express'
const router = express.Router()
import { addRestaurant, deleteRestaurant, getRestaurants, getWithInRange, login, rateRestaurant, register, updateRestaurant } from './apis/index'

router.get('/health', (req: Request, res: Response) => {
    res.status(200).json({ message: 'Server is running' })
})
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