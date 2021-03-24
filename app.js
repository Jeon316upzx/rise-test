// Packages
const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");

//Logs
const logger = require("./logger/logger");

// Init Env
if (process.env.ENV != "production") {
  require("dotenv").config();
}
logger.info(`Initialised env on ${process.env.ENV}`);

//Initialize Express App
const app = express();

//get Internal resources from ENV file
const apiVersion = process.env.API_VERSION;
const apiRoot = process.env.API_ROOT;
const BASE = `/${apiRoot}/${apiVersion}`;

// Parsing the json body
app.use(express.json());
app.use(express.urlencoded({ limit: "5mb", extended: false }));
app.use(cookieParser());

//Initialize Routers

const homeRouter = require("./routes/home.router");
const returnsRouter = require("./routes/returns.router");
const portfolioRouter = require("./routes/portfolio.router");
const planRouter = require("./routes/plan.router");

/*
  
   Bind routes to Express App by Providing the BASE and a router 

*/
app.use(BASE, homeRouter);
app.use(BASE, returnsRouter);
app.use(BASE, portfolioRouter);
app.use(BASE, planRouter);
/*
  
   Default Endpoint

*/
app.get("*", (req, res) =>
  res.status(200).send({
    message: "Welcome to rise test",
  })
);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
  logger.info(
    `Running server on ${process.env.ENV} 😀. \nListening on ${PORT} 👂`
  )
);

module.exports = app;
