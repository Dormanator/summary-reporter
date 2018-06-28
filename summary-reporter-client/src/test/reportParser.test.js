const reportParser = require("../services/reportParser"),
  sampleData = require("./sampleData"),
  sampleResult = require("./sampleResult");

test("parse data", () => {
  expect(reportParser(sampleData)).toEqual(sampleResult);
});
