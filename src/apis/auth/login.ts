import { Request, Response } from "express";
import User from "../../models/User"
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

async function login(req: Request, res: Response) {
    const { email, password } = req.body;
    const expression = /\S+@\S+/;
    if (!expression.test(email)) {
        return res.status(400).json({ message: "Invalid email" });
    }
    if (!email || !password) {
        return res.status(400).json({ message: 'Missing required information' });
    }

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Compare the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT
        const secret = process.env.JWT_SECRET
        console.log(secret);
        if (!secret) {
            console.error('JWT_SECRET is not set');
            return res.status(500).json({ message: 'Server error' });
        }
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET || 'secret',
            { expiresIn: '1h' }
        );

        // Respond with the token and user info
        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
            },
        });
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ message: 'Server error' });
    }
}

export default login;
