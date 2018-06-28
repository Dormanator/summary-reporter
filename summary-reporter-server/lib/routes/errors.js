const express = require("express"),
  router = express.Router(),
  { logError, getErrors } = require("../webservices/errors");

router
  .route("/")
  .get(getErrors)
  .post(logError);

module.exports = router;
