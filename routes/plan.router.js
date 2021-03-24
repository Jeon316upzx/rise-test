//packages
const express = require("express");
const router = express.Router();

//controllers
const { fetchPlan } = require("../controllers/plan.controller");

//portfolio route
router.get("/plan", fetchPlan);

//exports
module.exports = router;
