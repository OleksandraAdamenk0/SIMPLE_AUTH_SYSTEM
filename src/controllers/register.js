const nodemailer = require('nodemailer');
const {generateEmailVerificationToken} = require('../utils/redis');
const {getUserByEmail, createUser} = require("../models/user");

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USERNAME,
        pass: process.env.GMAIL_PASSWORD,
    }
})

async function sendVerificationEmail(user) {
    const token = generateEmailVerificationToken(user);
    console.log("sending token: ", token);
    const verificationLink = `http://localhost:${process.env.PORT || 5000}/api/auth/verify-email?token=${token}`;

    const mailOptions = {
        from: process.env.GMAIL_USERNAME,
        to: user.email,
        subject: 'Email Confirmation',
        text: `Please confirm your email by clicking on the following link: ${verificationLink}`,
    }

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.log("Error sending email: ", error);
    }
}

async function registerUser(req, res) {
    const { email, username, password } = req.body;
    console.log(req.body);

    try {
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({message: 'Email already in use'});
        }

        const newUser = await createUser(email, username, password);

        await sendVerificationEmail(newUser);

        res.render('confirmationPage', {email});
    } catch (error) {
        console.log("Error during registration: ", error);
        res.status(500).json({error: error});
    }
}

function registerController(req, res) {
    res.render('register');
}

module.exports = {registerController, registerUser};