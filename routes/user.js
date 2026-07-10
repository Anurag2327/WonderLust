const express = require("express");
const router = express.Router({ mergeParams : true });
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const {saveredirectUrl} = require("../middleware.js");
const userController = require("../controllers/users.js");

router.get("/signup", userController.renderSignupForm);

router.post( "/signup", wrapAsync( userController.signUp));

router.get("/login", userController.renderLoginForm);

router.post("/login",
    saveredirectUrl,
    passport.authenticate("local",{ failureRedirect: "/login", failureFlash: true}),
    userController.logIn
);

router.get("/logout", userController.logOut);

module.exports = router; 