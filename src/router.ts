import express, { Request, Response } from 'express'
const router = express.Router()
import { addRestaurant, deleteRestaurant, getRestaurants, login, rateRestaurant, register } from './apis/index'

router.get('/health', (req: Request, res: Response) => {
    res.status(200).json({ message: 'Server is running' })
})
// user route
router.post('/login', login)
router.post('/register', register)

// restaurant routes
router.post('/restaurant/',addRestaurant)
router.delete('/restaurant/:id',deleteRestaurant)
router.post('/restaurant/rate',rateRestaurant)
router.get('/restaurant/',getRestaurants)


export default router