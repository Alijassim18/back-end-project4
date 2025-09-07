const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET = process.env.JWT_SECRET || "your_jwt_secret";

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    if (user.role === "admin") {
      return res.json({
        message: "Admin login successful",
        role: user.role,
      });
    } else if (user.role === "supervisor") {
      return res.json({
        message: "Supervisor login successful",
        role: user.role,
      });
    } else if (user.role === "student") {
      const payload = { id: user._id, role: user.role };
      const token = jwt.sign(payload, SECRET, { expiresIn: "1h" });

      return res.json({
        message: "Student login successful",
        token,
        role: user.role,
      });
    } else {
      return res.status(403).json({ message: "Role not recognized" });
    }

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
