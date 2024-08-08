import { Request, Response } from "express";
import Restaurant from "../../models/Restaurant";

//  function to calculate the average rating
const getAverage = (ratings: { value: number }[]) => {
    if (ratings.length === 0) return 0;
    const sum = ratings.reduce((acc, rating) => acc + rating.value, 0);
    return sum / ratings.length;
}

async function getRestaurants(req: Request, res: Response) {
    const { longitude, latitude, radius } = req.query as { [key: string]: string };  // Getting the data from the request query, radius is in meters

    // Convert string queries to appropriate types
    const longitudeNum = parseFloat(longitude);
    const latitudeNum = parseFloat(latitude);
    const radiusNum = parseInt(radius, 10);

    if (isNaN(longitudeNum) || isNaN(latitudeNum) || isNaN(radiusNum)) {
        return res.status(400).json({ message: "Invalid query parameters" });
    }

    try {
        // Find the restaurants within the specified radius
        const restaurants = await Restaurant.find({
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [longitudeNum, latitudeNum],
                    },
                    $maxDistance: radiusNum,
                },
            },
        });

        // Map and format the restaurants
        const rsts = restaurants.map((restaurant) => {
            return {
                name: restaurant.name,
                description: restaurant.description,
                averageRating: getAverage(restaurant.rating),
                numberOfrating: restaurant.rating.length,
                location: restaurant.location
            };
        });

        res.status(200).json(rsts);
    } catch (error) {
        console.error("Error getting restaurants:", error);
        res.status(500).json({ message: "Server error" });
    }
}

export default getRestaurants;
