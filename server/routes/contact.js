const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
require('dotenv').config();
router.post('/', async (req, res) => {
    console.log('✅ Recieved a POST to /contact');

    const { name, email, message } = req.body;

    console.log('Contact submission', { name, email, message });

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS, //app password here
            },
            tls: {
                rejectUnauthorized: false,    //For Development only.
            }
        });
        await transporter.sendMail({
            from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_TO,
            subject: `New message from ${name}`,
            html: `
                <h3>New Contact Message</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong><br>${message}</p>
            `,
        });
        console.log('✅ Email Sent Successfully!');
        //Instead of sending message redirect the user to the Thank You Page
        res.redirect('/thankyou.html')
    } catch (err) {
        console.error('Email Error:', err);
        res.status(500).send('<h2>Sorry, something went wrong. Please try again later.</h2>')
    }
});
/*Handle GET requests to /contact if needed (another possible line of code I might consider)
  router.get('/', req, res) => ({This is optional and I can use it if I want to serve  a contact
        res.sendFile('path_to_contact_form.html');
)};*/

module.exports = router;