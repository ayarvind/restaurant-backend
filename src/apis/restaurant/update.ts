import { Request, Response } from "express";
import Restaurant from "../../models/Restaurant";

async function updateRestaurant(req: Request, res: Response) {
    const { id } = req.params; // Get the restaurant ID from the request parameters
    const { name, description } = req.body; // Get the new name and description from the request body

    try {
        // Find the restaurant by ID
        const restaurant = await Restaurant.findById(id);
        if (!restaurant) {
            return res.status(404).json({ message: "Restaurant not found" });
        }
        // Update the name and description if they are provided
        if (name) restaurant.name = name;
        if (description) restaurant.description = description;
        // Save the updated restaurant
        await restaurant.save();
        // Return the updated restaurant data
        res.status(200).json({
            message: "Restaurant updated successfully",
            restaurant: {
                id: restaurant._id,
                name: restaurant.name,
                description: restaurant.description,
                location: restaurant.location,
            },
        });
    } catch (error) {
        console.error("Error updating restaurant:", error);
        res.status(500).json({ message: "Server error" });
    }
}

export default updateRestaurant;
