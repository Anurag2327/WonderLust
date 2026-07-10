const express = require("express");
const router = express.Router({ mergeParams : true });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpErr = require("../utils/ExpErr.js");
const { reviewSchema} = require("../schema.js");
const Listing = require("../models/listing.js");
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js");
const Review = require("../models/review.js");
const reviewConstroller = require("../controllers/reviews.js");


//post review route
router.post("/", isLoggedIn, validateReview, wrapAsync( reviewConstroller.createReview));

//delete review route
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync( reviewConstroller.deleteReview));

module.exports = router;