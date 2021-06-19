const express = require('express');
const router = express.Router();
const campgrounds = require('../controllers/campgrounds');
const { campgroundSchema } = require('../schemas');
const ExpressError = require('../utils/ExpressError');
const Campground = require("../models/campground");
const multer = require('multer');
const { storage } = require('../cloudinary/index');
const upload = multer({ storage });
const { isLoggedIn, validateCampground, isAuthor } = require('../middleware');

router.route('/')
    .get(campgrounds.index)
    .post(isLoggedIn, upload.array('image'), validateCampground, campgrounds.createCampground);

router.get('/new', isLoggedIn, campgrounds.renderNewForm);

router.route('/:id')
    .get(campgrounds.showCampground)
    .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, campgrounds.updateCampground)
    .delete(isLoggedIn, isAuthor, campgrounds.deleteCampground);

router.get('/:id/edit', isLoggedIn, isAuthor, campgrounds.renderEditForm);


module.exports = router;