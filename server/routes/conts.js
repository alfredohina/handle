const express = require("express");
const router = express.Router();
const Container = require("../models/Container");

let contPromise = (req, cont) => {
    return new Promise((resolve, reject) => {
        req.container(cont, e => e ? reject(e) : resolve(cont))
    })
}


router.get("/list", (req, res) => {
    Container.find({ type: "plastic" })
    // const { user } = req;
    .then(cont => {
        console.log(cont)
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
            console.log('null')
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

module.exports = router;
