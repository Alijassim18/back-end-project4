const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const SECRET = process.env.SECRET || "dev_secret";

exports.registerAd = async (req, res) => {
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
      role: role || "admin",
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

exports.registerSt = async (req, res) => {
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
      role: role || "student",
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
