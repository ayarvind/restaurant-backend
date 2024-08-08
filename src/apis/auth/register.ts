import { Request, Response } from "express";
import User from "../../models/User";

async function register(request: Request, response: Response) {
    const { email, password, name } = request.body;
    try {
        const user = new User({ email, password, name });  //save the data to db
        await user.save();
        response.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.error("Error creating user:", error);
        response.status(500).json({ message: "Error creating user" });
    }
}


export default register;    