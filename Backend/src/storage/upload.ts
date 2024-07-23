import util from "util";
import path from "path";
import multer from "multer";

var storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const { locationFile } = req.params;
    callback(null, path.join(__dirname, `../files/${locationFile}/`));
  },
  filename: (req, file, callback) => {
    var filename = `${Date.now()}-${file.originalname}`;
    console.log(filename);
    callback(null, filename);
  },
});

var uploadFiles = multer({ storage: storage }).array("files");
var uploadFilesMiddleware = util.promisify(uploadFiles);

export default uploadFilesMiddleware;
