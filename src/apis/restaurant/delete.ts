import { Request, Response } from "express";
import Restaurant from "../../models/Restaurant";

async function deleteRestaurant(req: Request, res: Response) {
    const { id } = req.params;
    // Validate input
    if (!id) {
        return res.status(400).json({ message: 'Restaurant ID is required' });
    }
    try {
        // Find and delete the restaurant by ID
        const restaurant = await Restaurant.findByIdAndDelete(id);
        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }

        // Respond with success
        res.status(200).json({ message: 'Restaurant deleted successfully' });
    } catch (error) {
        console.error('Error deleting restaurant:', error);
        res.status(500).json({ message: 'Server error' });
    }
}
export default deleteRestaurant;
