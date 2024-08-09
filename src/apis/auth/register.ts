import { Request, Response } from "express";
import User from "../../models/User";

async function register(request: Request, response: Response) {
    const { email, password, name } = request.body;
    const expression = /\S+@\S+/;
    console.log(request.body);
    if (!expression.test(email)) {
        return response.status(400).json({ message: "Invalid email" });
    }
    if (!email || !password || !name) {
        return response.status(400).json({ message: "Missing required information" });
    }
    try {
        const user = await User.findOne({ email});
        if (user) {
            return response.status(400).json({ message: "User already exists" });
        }

        const newUser = new User({
            email,
            password,
            name,
        });
        await newUser.save();
      
        response.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.error("Error creating user:", error);
        response.status(500).json({ message: "Error creating user" });
    }
}


export default register;    