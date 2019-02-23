const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");
const uploadCloud = require("../configs/cloudinary.js");
// const { isLoggedIn } = require("../middlewares/IsLogged");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;


let loginPromise = (req, user) => {
  return new Promise((resolve,reject) => {
    req.login(user, e => e? reject(e):resolve(user))
  })
}

router.post("/login", (req, res, next) => {
  passport.authenticate("local",(err, theUser, failureDetails) => {
    // console.log(theUser)
    if (err) return res.status(500).json({ message: 'Something went wrong' });
    if (!theUser) return res.status(401).json(failureDetails);
    if (theUser.type !== "admin") return res.status(401).json(failureDetails);

    loginPromise(req, theUser)
      .then(() => res.status(200).json(req.user))
      .catch(e => res.status(500).json({ message: e.message }));
  })(req,res,next)
});


router.post("/signup", (req, res, next) => {
  const { username, password, type } = req.body;
  if (username === "" || password === "") {
    res.render("auth/signup", { message: "Indicate username and password" });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", { message: "The username already exists" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hashPass,
      type
    });

    newUser.save()
    .then(user =>  loginPromise(req, user).then(user => res.json({user})))
    .catch(err => {
      res.json({
        message:"Something goes Bad"
      })
    })
  });
});

router.post("/image", uploadCloud.single("photo"), (req, res, next) => {
  console.log('aA')
  const us = {}
  if (req.file) {
    us.image = req.file.url
}
  User.findByIdAndUpdate('5c5bf52c53e6a80a7df97337', us)
    .then(() => res.json({OK:"OK"}))
    .catch(e => console.log("Error updating profile", e));
});

router.get("/logout", (req, res) => {
  req.logout();
  res.json({succes:"Done"});
});

router.get("/currentuser", (req, res) => {
  const { user } = req;
  if (user) {
    res.json({ user });
  } else {
    res.json({user:null});
  }
});

module.exports = router;
