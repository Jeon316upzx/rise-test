//packages
const express = require("express");
const router = express.Router();

const is_protected = require("../middleware/protection.middleware");

//controllers
const { getPlanPerformance } = require("../controllers/returns.controller");

//returns route
router.get("/returns", is_protected, getPlanPerformance);

//exports
module.exports = router;
