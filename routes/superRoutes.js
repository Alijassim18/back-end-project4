const express = require("express");
const router = express.Router();
const { registerAd, registerSt } = require("../controller/super");
const authenticateJWT = require("../middleware/secureRoute"); 
const isSupervisor = require("../middleware/isSupervisor");

router.post("/register-admin", authenticateJWT, isSupervisor, registerAd);
router.post("/register-student", authenticateJWT, isSupervisor, registerSt);

module.exports = router;
