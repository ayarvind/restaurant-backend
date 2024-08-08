import { Request, Response } from "express";
import Restaurant from "../../models/Restaurant";

async function rateRestaurant(req: Request, res: Response) {
    const { rating, id } = req.body;
    const user = req.body.user; 

    // Validate input
    if (!rating || !id || !user) {
        return res.status(400).json({ message: 'Invalid data' });
    }

    // Ensure rating is a number and within a valid range (e.g., 1-5)
    const ratingValue = Number(rating);
    if (isNaN(ratingValue) || ratingValue < 1 || ratingValue > 5) {
        return res.status(400).json({ message: 'Invalid rating value' });
    }

    try {
        // Find the restaurant by ID
        const restaurant = await Restaurant.findById(id);
        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }

        // Check if the user has already rated the restaurant
        const existingRating = restaurant.rating.find((r)=>{
            return r?.user?._id.toString() === user.id.toString();
        });
        if (existingRating) {
            return res.status(400).json({ message: 'User has already rated this restaurant' });
        }

        // Add the rating and save
        restaurant.rating.push({
            user: user.id, 
            value: ratingValue,
        });
        await restaurant.save();

        // Respond with success
        res.status(200).json({ message: 'Rating added successfully' });
    } catch (error) {
        console.error('Error adding rating:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

export default rateRestaurant;
