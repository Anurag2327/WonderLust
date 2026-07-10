const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer')
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage })

//Index route
router.get("/",
    wrapAsync(listingController.index)
);

//new route
router.get("/new",
    isLoggedIn, 
    listingController.renderNewForm
);

//Show route
router.get("/:id", 
    wrapAsync( listingController.showListing)
);

//create route
router.post("/", 
    isLoggedIn, 
    upload.single('listing[image]'),
    validateListing,
    wrapAsync( listingController.createListing)
);


//edit route
router.get("/:id/edit", 
    isLoggedIn, 
    isOwner, 
    wrapAsync( listingController.editListing)
);

//update route
router.put("/:id", 
    isLoggedIn, 
    isOwner,
    upload.single('listing[image]'), 
    validateListing, 
    wrapAsync( listingController.updateListing)
);

//delete route
router.delete("/:id", 
    isLoggedIn, 
    isOwner, 
    wrapAsync( listingController.deleteListing)
);

module.exports = router; 