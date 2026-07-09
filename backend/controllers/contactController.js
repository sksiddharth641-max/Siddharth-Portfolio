const Contact = require("../models/Contact");
const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const createContact = async (req, res) => {
    try {

        const { name, email, phone, projectType, budget, message } = req.body;

        // Save to MongoDB
        const contact = await Contact.create({
            name,
            email,
            phone,
            projectType,
            budget,
            message,
        });

        // Send email
        await resend.emails.send({
            from: "onboarding@resend.dev",
            to: "sksiddharth641@gmail.com", // Replace with your Gmail
            subject: "🎉 New Portfolio Inquiry",
            html: `
                <h2>New Inquiry Received</h2>

                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Project Type:</strong> ${projectType}</p>
                <p><strong>Budget:</strong> ${budget}</p>

                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `,
        });

        res.status(201).json({
            success: true,
            message: "Inquiry Sent Successfully",
            data: contact,
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

module.exports = {
    createContact,
};

