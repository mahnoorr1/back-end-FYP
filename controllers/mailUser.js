const nodemailer = require('nodemailer');
const Alert = require('../model/alert')
var User = require('../model/User')
require('dotenv').config();

const emailUser = async (req, res) => {
    try {
        const alert = await Alert.findById(req.params.aid);

        if (!alert) {
            return res.status(404).json({ message: 'Alert not found.' });
        }

        // Assuming alert.user is the user ID
        const userId = alert.user;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            port: 465,
            secure: true,
            logger:true,
            debug:true,
            secureConnection:false,
            auth: {
                user: process.env.Gmail_Account,
                pass: process.env.Gmail_Password,
            },
            tls:{
                rejectUnauthorized:true
            }            
        });
        

        const mailOptions = {
            from: process.env.Gmail_Account,
            to: user.email,
            subject: 'Alert Notification',
            text: `Dear ${user.firstname},\n\n${alert.description}\n\nBest regards,\n Infrastate Admin`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ error: 'An error occurred while sending the email.' });
            }
            console.log('Email sent:', info.response);
            return res.status(200).json({ message: 'Email sent successfully.' });
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error.' });
    }
};

module.exports = {
    emailUser,
};
