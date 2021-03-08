const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const loginRender = (req, res) => {
    try {
        res.render("login.ejs", { error: " " })
    } catch (error) {
        res.render("login.ejs", { error: error })
    }
}

const loginSubmit = async(req, res) => {

    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.render("login.ejs", { error: "Sorry, we don't recognize that email address. Try again!" });

    const validUser = await bcrypt.compare(req.body.password, user.password);
    if (!validUser) res.render("login.ejs", { error: "The password you have entered is incorrect. Try again!" });
    const jwtToken = await jwt.sign({ user: user }, process.env.SECRETKEY);


    if (jwtToken) {
        const cookie = req.cookies.jwtToken;
        if (!cookie) {
            res.cookie("jwtToken", jwtToken, { maxAge: 3600000, httpOnly: true });
        }
        return res.redirect("/")
    }


}

module.exports = {
    loginRender,
    loginSubmit
}