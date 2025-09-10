const express = require("express");
const router = express.Router();

const { login, register} = require("../controller/auth");


router.post("/login", login);
router.post("/super",register)

module.exports = router;
