const express = require("express");
const router = express.Router();
const { Contact } = require("../models");

// Get all contact submissions (admin only)
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.json({ contacts });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Create new contact submission
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        message: "Missing required fields",
        required: ["name", "email", "subject", "message"],
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const contact = await Contact.create({
      name,
      email,
      phone: phone || null,
      subject,
      message,
      status: "new",
    });

    res.status(201).json({
      message: "Contact form submitted successfully",
      contact,
    });
  } catch (error) {
    console.error("Error creating contact:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update contact status (admin only)
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const contact = await Contact.findByPk(id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    await contact.update({ status });
    res.json({ message: "Contact updated successfully", contact });
  } catch (error) {
    console.error("Error updating contact:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete contact (admin only)
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const contact = await Contact.findByPk(id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    await contact.destroy();
    res.json({ message: "Contact deleted successfully" });
  } catch (error) {
    console.error("Error deleting contact:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
