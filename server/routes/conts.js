const express = require("express");
const router = express.Router();
const Container = require("../models/Container");

let contPromise = (req, user) => {
    return new Promise((resolve, reject) => {
        req.container(user, e => e ? reject(e) : resolve(user))
    })
}

router.post("/addcont", (req, res, next) => {
    const { location, type } = req.body;
    if (location === "" || type === "") {
        res.render("cont/addcont", { message: "Select location and type of container" });
        return;
    }

    Container.findOne({ location }, "location", (err, cont) => {
        if (cont !== null) {
            res.render("cont/addcont", { message: "The container already exists" });
            return;
        }

        const newCont = new User({
            location,
            type
        });

        newCont.save()
            .then(cont => loginPromise(req, cont).then(cont => res.json({ cont })))
            .catch(err => {
                res.json({
                    message: "Something goes Bad"
                })
            })
    });
});