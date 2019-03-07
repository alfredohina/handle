const express = require("express");
const router = express.Router();
const Container = require("../models/Container");
const Report = require("../models/Report");


let contPromise = (req, cont) => {
    return new Promise((resolve, reject) => {
        req.container(cont, e => e ? reject(e) : resolve(cont))
    })
}


router.post("/listinit", (req, res, next) => {
    Container.find()
        .then(cont => {
            res.json({ cont });
        })
        .catch(e => res.json({ message: "Something went wrong" }));
});

router.post("/list", (req, res, next) => {
    const { type } = req.body;
    Container.find({ type: type })
        .then(cont => {
            res.json({ cont });
        })
        .catch(e => res.json({ message: "Something went wrong" }));
});


router.post("/addcont", (req, res, next) => {
    const { name, lat, lng, type, level } = req.body;
    if (lat === "" || type === "") {
        res.render("conts/addcont", { message: "Select location and type of container" });
        return;
    }

    Container.findOne({ name }, "name", (err, n) => {
        if (n !== null) {
            res.render("conts/addcont", { message: "The container already exists" });
            return;
        }

        const newCont = new Container({
            name,
            lat,
            lng,
            type,
            level
        });

        newCont.save()
            .then(cont => contPromise(req, cont).then(cont => res.json({ cont })))
            .catch(err => {
                res.json({
                    message: "Something goes Bad"
                })
            })
    });
});


router.post("/addreport", (req, res, next) => {
    console.log(req.body)
    const { user, cont, type, date, name, lat, lng, gender } = req.body;

    const newReport = new Report({
        id_user: user,
        id_container: cont,
        type,
        date,
        name,
        lat,
        lng,
        gender
    });

    newReport.save()
        .then(report => res.json({ report }))
        .catch(err => {
            res.json({
                message: "Something goes Bad"
            })
        })
});

router.post("/getreports", (req, res, next) => {
    const { user, date, cont } = req.body;
    const lastHours = date - 86400000
    Report.find({ id_user: user, date: { $gt: lastHours }, id_container: cont})
    .then(cont => {
        // console.log(cont)
            res.json({ cont });
        })
        .catch(e => res.json({ message: "Something went wrong" }));
});


router.post("/getreportstype", (req, res, next) => {
    const { type, hour, gender } = req.body
    console.log(gender)
    Report.find( {type: type, date: { $gt: hour }, gender: gender } )
        .then(cont => {
            console.log(cont)
            res.json({ cont });
        })
        .catch(e => res.json({ message: "Something went wrong" }));
});


module.exports = router;