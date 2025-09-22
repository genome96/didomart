const jwt = require("jsonwebtoken");

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || "30d",
  });
};

// Send token response
const sendTokenResponse = (user, statusCode, res, message = "Success") => {
  // Create token
  const token = generateToken(user.id); // Changed from user._id to user.id for Sequelize

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    success: true,
    message,
    token,
    user,
  });
};

module.exports = {
  generateToken,
  sendTokenResponse,
};
