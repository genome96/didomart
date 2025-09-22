const Contact = require("../models/Contact");
const { sendContactEmail, sendAutoReply } = require("../utils/email");
const { body, validationResult } = require("express-validator");

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
exports.submitContact = [
  body("name")
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Name must be between 2-100 characters"),
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Please provide a valid email"),
  body("subject")
    .trim()
    .isLength({ min: 5, max: 200 })
    .withMessage("Subject must be between 5-200 characters"),
  body("message")
    .isLength({ min: 10, max: 1000 })
    .withMessage("Message must be between 10-1000 characters"),
  body("phone")
    .optional()
    .isLength({ max: 20 })
    .withMessage("Phone number cannot exceed 20 characters"),

  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: "Validation errors",
          errors: errors.array(),
        });
      }

      const { name, email, phone, subject, message } = req.body;

      // Create contact record
      const contact = await Contact.create({
        name,
        email,
        phone,
        subject,
        message,
      });

      // Send email notifications
      try {
        // Send to admin
        await sendContactEmail(contact);

        // Send auto-reply to customer
        await sendAutoReply(contact);
      } catch (emailError) {
        console.error("Email sending failed:", emailError);
        // Don't fail the request if email fails
      }

      res.status(201).json({
        success: true,
        message: "Thank you for your message. We will get back to you soon!",
        data: {
          id: contact._id,
          name: contact.name,
          email: contact.email,
          subject: contact.subject,
          createdAt: contact.createdAt,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Failed to send message. Please try again later.",
      });
    }
  },
];

// @desc    Get all contact messages
// @route   GET /api/contact
// @access  Private/Admin
exports.getContacts = async (req, res) => {
  try {
    const {
      isRead,
      isReplied,
      page = 1,
      limit = 20,
      sort = "-createdAt",
    } = req.query;

    // Build query
    let query = {};

    if (isRead !== undefined) {
      query.isRead = isRead === "true";
    }

    if (isReplied !== undefined) {
      query.isReplied = isReplied === "true";
    }

    // Pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const contacts = await Contact.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limitNum);

    const total = await Contact.countDocuments(query);

    res.status(200).json({
      success: true,
      count: contacts.length,
      total,
      totalPages: Math.ceil(total / limitNum),
      currentPage: pageNum,
      data: contacts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// @desc    Get single contact message
// @route   GET /api/contact/:id
// @access  Private/Admin
exports.getContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact message not found",
      });
    }

    // Mark as read when viewed
    if (!contact.isRead) {
      contact.isRead = true;
      await contact.save();
    }

    res.status(200).json({
      success: true,
      data: contact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// @desc    Update contact status
// @route   PUT /api/contact/:id
// @access  Private/Admin
exports.updateContact = [
  body("isRead").optional().isBoolean().withMessage("isRead must be a boolean"),
  body("isReplied")
    .optional()
    .isBoolean()
    .withMessage("isReplied must be a boolean"),
  body("adminNotes")
    .optional()
    .isLength({ max: 500 })
    .withMessage("Admin notes cannot exceed 500 characters"),

  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: "Validation errors",
          errors: errors.array(),
        });
      }

      const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });

      if (!contact) {
        return res.status(404).json({
          success: false,
          message: "Contact message not found",
        });
      }

      res.status(200).json({
        success: true,
        data: contact,
        message: "Contact updated successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  },
];

// @desc    Delete contact message
// @route   DELETE /api/contact/:id
// @access  Private/Admin
exports.deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact message not found",
      });
    }

    await contact.remove();

    res.status(200).json({
      success: true,
      message: "Contact message deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// @desc    Get contact statistics
// @route   GET /api/contact/stats
// @access  Private/Admin
exports.getContactStats = async (req, res) => {
  try {
    const total = await Contact.countDocuments();
    const unread = await Contact.countDocuments({ isRead: false });
    const unreplied = await Contact.countDocuments({ isReplied: false });
    const today = await Contact.countDocuments({
      createdAt: {
        $gte: new Date().setHours(0, 0, 0, 0),
        $lt: new Date().setHours(23, 59, 59, 999),
      },
    });

    res.status(200).json({
      success: true,
      data: {
        total,
        unread,
        unreplied,
        today,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
