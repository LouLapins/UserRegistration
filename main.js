const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const router = require("./routes/homeRoute");
const userRouter = require("./routes/userRoute");
const nodeSass = require("node-sass-middleware");
const cookieParser = require("cookie-parser");


require("dotenv").config();

const app = express();

// SASS //

app.use(nodeSass(

    {
        src: __dirname + "/scss",
        dest: __dirname + "/public/css"
    }

))

////////

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + "/public"));

app.set("view engine", "ejs");
app.use(cookieParser());
app.use("/", router);
app.use("/", userRouter);

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect(process.env.DATABASE_URL,
    options,
    (err) => {

        console.log(err)
        if (err) return;

        console.log("Connected to database!");

        app.listen(process.env.PORT, () => {
            console.log("Application is running");
        })

    })