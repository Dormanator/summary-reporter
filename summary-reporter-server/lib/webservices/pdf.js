const HeadlessChrome = require("simple-headless-chrome"),
  path = require("path"),
  fs = require("fs"),
  uuid = require("node-uuid");

module.exports = function(req, res, next) {
  // new isntance of headless chrome
  const browser = new HeadlessChrome({
    headless: true
  });

  // pull from request body
  const { data, options } = req.body;

  // create and write temp files
  const tmpPdfName = path.join(process.cwd(), "/tmp", uuid.v4()),
    tmpHtml = path.join(process.cwd(), "/tmp", uuid.v4() + ".html");

  // write html from post to temp file
  fs.writeFile(tmpHtml, data, () => {
    console.log(`temp html file created at ${tmpHtml}`);
  });

  // gen pdf based on post data
  generatePdf(tmpHtml, tmpPdfName, options);

  async function generatePdf(tmpHtmlPath, pdfName = null, options = {}) {
    try {
      // start up browser
      await browser.init();

      // Open a new Tab
      const mainTab = await browser.newTab({ privateTab: false });

      // Navigate to a URL
      console.log(`navigating to ${tmpHtmlPath}`);
      await mainTab.goTo("file://" + tmpHtmlPath);

      // Take a screenshot of the selector with the files
      const tmpPdf = await mainTab.savePdf(tmpPdfName, options);

      // setup response obj
      res.header("content-type", "application/pdf");
      // pipe pdf to response
      const stream = fs.createReadStream(tmpPdf);
      stream.on("open", function() {
        stream.pipe(res);
      });
      stream.on("error", next);
      // delete tmp files
      stream.on("close", function() {
        deleteFiles([tmpPdf, tmpHtmlPath]);
      });

      // Close the browser
      await browser.close();

      // catch errors
    } catch (err) {
      return next(err);
    }
  }

  function deleteFiles(fileArr) {
    fileArr.forEach(file => {
      fs.unlink(file, err => {
        if (err) {
          return next(err);
        }
        console.log(`Temporary ${file} successfully deleted from server`);
      });
    });
  }

  return res.status(200);
};
