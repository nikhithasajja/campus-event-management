const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const registerUser = async (req, res) => {
    try {

        const { name, email, password, role } = req.body;

        // Check if email already exists
        const existingUser = await userModel.findUserByEmail(email);

        if (existingUser.length > 0) {
            return res.status(400).json({
                message: "Email already exists"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save user
        await userModel.createUser(
            name,
            email,
            hashedPassword,
            role
        );

        res.status(201).json({
            message: "User Registered Successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Internal Server Error"
        });

    }
};
const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        // Find User
        const users = await userModel.findUserByEmail(email);

        if (users.length === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const user = users[0];

        // Compare Password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid Password"
            });
        }

        // Generate JWT
        const token = jwt.sign(
            {
                id: user.id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );

        res.status(200).json({
            message: "Login Successful",
            token
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Internal Server Error"
        });

    }

};

module.exports = {
    registerUser,
    loginUser
};