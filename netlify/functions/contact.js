// netlify/functions/contact.js
const nodemailer = require("nodemailer");

exports.handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  // Parse JSON or form data (Netlify passes raw string)
  let data;
  try {
    data = JSON.parse(event.body);
  } catch {
    const params = new URLSearchParams(event.body);
    data = Object.fromEntries(params.entries());
  }

  const { name, email, message } = data;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
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

    // Equivalent to res.redirect('/thankyou.html')
    return {
      statusCode: 303,
      headers: { Location: "/thankyou.html" },
    };

  } catch (error) {
    console.error("Email Error:", error);
    return {
      statusCode: 500,
      body: "<h2>Sorry, something went wrong. Please try again later.</h2>",
    };
  }
};
