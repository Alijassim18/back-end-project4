const express = require("express");
const router = express.Router();
const { registerAd, registerSt,allUser,deleteUser } = require("../controller/super");


router.post("/register-admin", registerAd);
router.post("/register-student",registerSt);
router.get("/all-user", allUser);
router.delete("/:id", deleteUser);

module.exports = router;
