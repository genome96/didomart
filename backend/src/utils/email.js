const nodemailer = require("nodemailer");

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// Send email
const sendEmail = async (options) => {
  try {
    const transporter = createTransporter();

    const message = {
      from: `${process.env.EMAIL_FROM} <${process.env.EMAIL_USER}>`,
      to: options.email,
      subject: options.subject,
      html: options.html || options.message,
    };

    const info = await transporter.sendMail(message);
    console.log("Email sent: ", info.messageId);
    return info;
  } catch (error) {
    console.error("Email error: ", error);
    throw error;
  }
};

// Send contact form email to admin
const sendContactEmail = async (contactData) => {
  const html = `
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${contactData.name}</p>
    <p><strong>Email:</strong> ${contactData.email}</p>
    <p><strong>Phone:</strong> ${contactData.phone || "Not provided"}</p>
    <p><strong>Subject:</strong> ${contactData.subject}</p>
    <p><strong>Message:</strong></p>
    <p>${contactData.message}</p>
    <hr>
    <p><small>Sent at: ${new Date().toLocaleString()}</small></p>
  `;

  return await sendEmail({
    email: process.env.ADMIN_EMAIL,
    subject: `New Contact: ${contactData.subject}`,
    html,
  });
};

// Send auto-reply email to customer
const sendAutoReply = async (contactData) => {
  const html = `
    <h2>Thank you for contacting us!</h2>
    <p>Dear ${contactData.name},</p>
    <p>We have received your message and will get back to you as soon as possible.</p>
    <h3>Your Message:</h3>
    <p><strong>Subject:</strong> ${contactData.subject}</p>
    <p><strong>Message:</strong> ${contactData.message}</p>
    <hr>
    <p>Best regards,<br>Your Business Team</p>
  `;

  return await sendEmail({
    email: contactData.email,
    subject: "Thank you for your message - Your Business",
    html,
  });
};

module.exports = {
  sendEmail,
  sendContactEmail,
  sendAutoReply,
};
