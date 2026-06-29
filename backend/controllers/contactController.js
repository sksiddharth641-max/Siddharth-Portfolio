const Contact = require("../models/Contact");

const createContact = async (req, res) => {
    try {
        const contact = await Contact.create(req.body);

        res.status(201).json({
            success: true,
            message: "Message Sent Successfully",
            data: contact,
        });

    } catch (error) {
        console.error("Error creating contact:", error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    createContact,
};