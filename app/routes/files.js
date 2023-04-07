const upload = require("../middlewares/multer");
const createHttpError = require("http-errors");

const serveHtmlPage = (req, res, next) => {
  res.render("index");
};

const uploadFile = (req, res, next) => {
  console.log(req.file);
  upload(req, res, (err) => {
    if (err) {
      next(
        createHttpError(
          err.status || 400,
          err.message || "Something went wrong"
        )
      );
    }
    res.status(201).send(req.file);
  });
};

module.exports = { serveHtmlPage, uploadFile };
