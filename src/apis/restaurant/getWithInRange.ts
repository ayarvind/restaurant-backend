import { Request, Response } from "express";
import Restaurant from "../../models/Restaurant";

async function getWithInRange(request: Request, response: Response) {
    const { Latitude, Longitude, minimumDistance, maximumDistance } = request.query as { [key: string]: string }
    console.log(Latitude, Longitude, minimumDistance, maximumDistance);
    // Validate input
    if (
        !Latitude ||
        !Longitude ||
        !minimumDistance ||
        !maximumDistance 
    ) {
        return response.status(400).json({ message: "Invalid data" });
    }

    // Convert input to the correct types
    const latitudeNum = parseFloat(Latitude);
    const longitudeNum = parseFloat(Longitude);
    const minDistNum = parseInt(minimumDistance, 10);
    const maxDistNum = parseInt(maximumDistance, 10);
    if(isNaN(latitudeNum) || isNaN(longitudeNum) || isNaN(minDistNum) || isNaN(maxDistNum)){
        return response.status(400).json({ message: "Invalid data" });
    }
    try {
        // Find restaurants within the specified distance range
        const restaurants = await Restaurant.find({
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [longitudeNum, latitudeNum]
                    },
                    $minDistance: minDistNum, //  in meters
                    $maxDistance: maxDistNum  //  in meters
                }
            }
        });

        // Format the response data
        const results = restaurants.map((restaurant) => ({
            name: restaurant.name,
            description: restaurant.description,
            location: restaurant.location,
            averageRating: restaurant.rating.length > 0 ? restaurant.rating.reduce((sum, r) => sum + r.value, 0) / restaurant.rating.length : 0,
            numberOfRatings: restaurant.rating.length,
        }));

        // Send response
        response.status(200).json(results);
    } catch (error) {
        console.error("Error finding restaurants:", error);
        response.status(500).json({ message: "Server error" });
    }
}

export default getWithInRange;
