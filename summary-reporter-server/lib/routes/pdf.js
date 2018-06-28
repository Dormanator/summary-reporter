const express = require("express"),
  router = express.Router(),
  pdfService = require("../webservices/pdf");

router.route("/").post(pdfService);

module.exports = router;
