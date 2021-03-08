const express = require("express");
const router = express.Router();

const userVerify = require("../middleware/userVerify");
const { homeRender, addTask, editTaskGet, editTaskPost, deleteTask } = require("../controller/home");


// LOGIN //
router.get("/", userVerify, homeRender);

/// LOGOUT /// 
router.get("/logout", (req, res) => {

    res.clearCookie("jwtToken").redirect("/login")
});


// CREATE // 

router.post("/", userVerify, addTask);


// UPDATE (EDIT) //

router.get("/edit/:id", userVerify, editTaskGet);

router.post("/edit", userVerify, editTaskPost);


// DELETE //

router.get("/delete/:id", userVerify, deleteTask);

module.exports = router;