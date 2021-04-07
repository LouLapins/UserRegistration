const express = require("express");

const router = express.Router();

const { registerRender, registerSubmit } = require("../controller/register")

const { loginRender, loginSubmit } = require("../controller/login");



const verifyToken = require("../middleware/userVerify");


router.get("/register", registerRender);

router.post("/register", registerSubmit);

router.get("/login", loginRender);

router.post("/login", loginSubmit)




module.exports = router;