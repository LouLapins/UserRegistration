const Task = require("../model/task");
const User = require("../model/user");


const homeRender = async(req, res) => {

    const sorted = +req.query.sorted || 1;
    const page = +req.query.page || 1;

    try {
        const totalData = await Task.find().countDocuments();

        const dataToShowPerReq = 5;

        const totalPages = Math.ceil(totalData / dataToShowPerReq);

        const dataToShow = dataToShowPerReq * page;

        const data = await Task.find().limit(dataToShow).sort({ date: sorted });

        res.render("index.ejs", { id: req.params.id, sorted, page, data, totalData, totalPages, dataToShow, dataToShowPerReq, errors: "empty" })

    } catch (err) {
        res.render("error.ejs", { error: err });
    }

}

const addTask = async(req, res) => {

    try {
        await new Task({ name: req.body.name }).save();
        res.redirect("/");

    } catch (err) {
        res.render("error.ejs", { error: err });
    }

}

const editTaskGet = async(req, res) => {
    const sorted = +req.query.sorted || 1;
    const page = +req.query.page || 1;

    try {
        const task = await Task.findOne({ _id: req.params.id });

        const totalData = await Task.find().countDocuments();

        const dataToShowPerReq = 5;

        const totalPages = Math.ceil(totalData / dataToShowPerReq);

        const dataToShow = dataToShowPerReq * page;

        const data = await Task.find().limit(dataToShow).sort({ date: sorted });

        res.render("edit.ejs", { task: task, id: req.params.id, sorted, page, data, totalData, totalPages, dataToShow, dataToShowPerReq, errors: "empty" });

    } catch (err) {
        res.render("error.ejs", { error: err });
    }

}

const editTaskPost = async(req, res) => {

    const sorted = +req.query.sorted || 1;
    const page = +req.query.page || 1;


    await Task.updateOne({ _id: req.body.id }, { name: req.body.name });

    res.redirect(`/?page=${page}&&sorted=${sorted}`);

}

const deleteTask = async(req, res) => {

    await Task.deleteOne({ _id: req.params.id });

    res.redirect("/");
}

module.exports = {
    homeRender,
    addTask,
    editTaskGet,
    editTaskPost,
    deleteTask
}