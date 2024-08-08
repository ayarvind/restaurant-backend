import { Request, Response } from "express";
import Restaurant from "../../models/Restaurant";
async function addRestaurant(req: Request, res: Response) {
    const { name, description, location } = req.body; //getting the data from the request body
    try {
        const restaurant = new Restaurant({
            owner: req.body.user.id,
            name,
            description,
            location:{
                type: "Point",
                coordinates: [location.longitude, location.latitude]
            }
        });
        await restaurant.save();
        res.status(201).json({
            message: "Restaurant created successfully",
            restaurantId: restaurant._id

        });
    } catch (error) {
        console.error("Error creating restaurant:", error);
        res.status(500).json({ message: "Error creating restaurant" });
    }
}

export default addRestaurant;