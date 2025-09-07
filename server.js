const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv").config();
const loginRouter=require("./routes/authRoutes");
const examRouter=require("./routes/examRoutes")
const submRouter=require('./routes/submRoutes');
const superRouter=require('./routes/superRoutes')

const app = express();

mongoose.connect(process.env.URL)
  .then(() => console.log("Database is connected"))
  .catch(err => console.error("MongoDB connection error:", err));

app.use(cors({ origin: "http://localhost:5173" }));
app.use(morgan("dev"));
app.use(express.json());

app.use((req, res) => {
  res.status(404).json("Route not found 404");
});

app.listen(3000, () => {
  console.log("The backend is listening on port 3000");
});
