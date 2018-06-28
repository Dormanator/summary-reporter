const db = require("../models");

exports.logError = async function (req, res, next) {
  try {
    const newError = await db.Error.create(req.body);
    return res.status(200).json(newError);
  } catch (err) {
    return next(err);
  }
};

exports.getErrors = async function (req, res, next) {
  try {
    const foundErrors = await db.Error.find({});
    return res.status(200).json(foundErrors);
  } catch (err) {
    return next(err);
  }
};
