const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    console.log(file);
    cb(null, `${file.fieldname}_${Date.now()}.${ext}`);
  },
});

const limits = { fileSize: 5 * 1024 * 1024 };

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/bmp") {
    cb(null, true);
  } else {
    cb(
      {
        success: false,
        message: "Invalid file type. Only bmp image files are allowed.",
      },
      false
    );
  }
};

const upload = multer({ storage, limits, fileFilter }).single("myFile");

module.exports = upload;
