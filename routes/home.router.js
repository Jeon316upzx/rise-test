//packages
const express = require("express");
const router = express.Router();

//controllers
const { getHome } = require("../controllers/home.controller");

//home route
router.get("/", getHome);

//exports
module.exports = router;
