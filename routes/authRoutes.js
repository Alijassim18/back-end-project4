const express = require("express")
const router = express.Router()

{
login
} = require("../controller/auth")  

router.post("/login", login)


module.exports = router
