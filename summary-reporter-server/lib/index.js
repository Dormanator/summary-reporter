"use strict";
require("dotenv").config();
// dependencies
const express = require("express"),
  app = express(),
  cors = require("cors"),
  compression = require("compression"),
  morgan = require("morgan"),
  bodyParser = require("body-parser");
// handlers, middleware, & routes
const errorHandler = require("./handlers/error"),
  pdfRoutes = require("./routes/pdf"),
  errorsRoutes = require("./routes/errors");


// server settings
app.use(cors({
  origin: 'https://www.summaryreporter.com/',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}));
app.use(bodyParser.json());
app.use(morgan("combined"));
app.use(compression());
app.use("/api/pdf", pdfRoutes);
app.use("/api/errors", errorsRoutes);

// index route
app.get("/api", function (req, res, next) {
  if (req) {
    return res.status(200).json({ status: "online" });
  } else {
    return next("Something went wrong with the index route");
  }
});

// create a 404 error if no routes applied to request
app.use(function (req, res, next) {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});
// use the error handler we built with pretty json responses
app.use(errorHandler);

// listen
app.listen(process.env.PORT, () => {
  console.log(`Listening on ${process.env.PORT}`);
});
