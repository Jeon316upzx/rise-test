//packages
const express = require("express");
const router = express.Router();

//controllers
const { getPortfolio } = require("../controllers/portfolio.controller");

//portfolio route
router.get("/portfolio", getPortfolio);

//exports
module.exports = router;
