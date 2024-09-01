import multer, { FileFilterCallback } from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/assets/upload");
  },
  filename: function (req, file, cb) {
    console.log("entered the");
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});
// file Filter to check the csv format
const csvFilter = (
  req: any,
  file: Express.Multer.File,
  cb: FileFilterCallback
): void => {
  //check file mimetype and extension
  if (
    file.mimetype === "text/csv" ||
    path.extname(file.originalname).toLowerCase() === ".csv"
  ) {
    cb(null, true); //Accept the file
  } else {
    cb(null, false); // Reject the file
    req.fileValidationError = "Only CSV files are allowed!";
  }
};

export const upload = multer({ storage: storage, fileFilter: csvFilter });
