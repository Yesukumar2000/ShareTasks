const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const app = express();
const PORT = 7995;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
let connectToMongoDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/shareTasksDB");
        console.log("Successfully Connected To MongoDB");
    } catch (error) {
        console.error("Unable to connect to MongoDB", error);
    }
};

// Mongoose Model
const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    otp: { type: String },
});

const User = mongoose.model('User', UserSchema);

// Create Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'kumaryesu2000@gmail.com',
        pass: 'ixga egne lame zape'
    }
});

// Registration Route
app.post('/api/register', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully." });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// Login Route
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials." });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials." });
        }

        res.status(200).json({ message: "Login successful", user: { email: user.email } });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// Forgot Password Route
app.post('/api/forgot-password', async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User with this email does not exist." });
        }

        const otp = crypto.randomInt(1000, 9999).toString();

        user.otp = otp;
        await user.save();

        const mailOptions = {
            from: 'kumaryesu2000@gmail.com',
            to: email, 
            subject: 'Your OTP for Password Reset',
            text: `Your OTP for password reset is ${otp}`
        };
        console.log("email:", email);
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                return res.status(500).json({ message: 'Error sending OTP', error });
            }
            console.log('Email sent:', info.response);
            console.log("Generated OTP:", otp);
            res.status(200).json({ message: 'OTP sent successfully' });
        });

    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});
app.post('/api/verify-otp', async (req, res) => {
    const { otp } = req.body;  // Get OTP from request body

    try {
        // Find the user by OTP
        const user = await User.findOne({ otp });
        if (!user) {
            return res.status(400).json({ message: "Invalid OTP." });
        }

        // OTP is valid, clear it from the database
        user.otp = null;
        await user.save();
        res.status(200).json({ message: "OTP verified successfully." });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// Reset Password Route
app.post('/api/reset-password', async (req, res) => {
    const { email, newPassword } = req.body;
    console.log("Email received:", email);  
    console.log("New password received:", newPassword);  

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User with this email does not exist." });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: "Password updated successfully." });
    } catch (error) {
        console.error("Error in resetting password:", error);  
        res.status(500).json({ message: "Server error", error });
    }
});


// Start Server
connectToMongoDB();
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
