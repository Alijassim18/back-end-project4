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

   
    const payload = { id: user._id, role: user.role };
    const token = jwt.sign(payload, SECRET, { expiresIn: "1h" });

    return res.json({
      message: `${user.role} login successful`,
      token,
      role: user.role,
      name: user.name,  
    });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
exports.register = async (req, res) => {
  try {
    const { email, name, password, role } = req.body


    if (!email || !name || !password) {
      return res
        .status(400)
        .json({ message: "Email, name, and password are required" })
    }

   
    const existing = await User.findOne({ email })
    if (existing) {
      return res.status(400).json({ message: "Email already exists" })
    }

    
    const passwordHash = await bcrypt.hash(password, 8)


    const newUser = new User({
      email,
      name,
      passwordHash,
      role: role || "supervisor",
    })

    await newUser.save()

    res
      .status(201)
      .json({ message: `${newUser.role} registered successfully` })
  } catch (err) {
    console.error("Register error:", err)
    res.status(500).json({ message: "Server error" })
  }
}
