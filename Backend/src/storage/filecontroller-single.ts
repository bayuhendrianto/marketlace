import upload from "./upload-single";
const originUrl = "http://localhost:3000/";

const singleUpload = async (req: any, res: any) => {
  try {
    await upload(req, res);
    const { locationFile } = req.params;
    var fileName = req.file.filename;

    if (!req.file) {
      return res.send(`You must select at least 1 file.`);
    }

    return res.send({
      status: "success",
      url: originUrl + `assets/${locationFile}/` + fileName,
    });
  } catch (error: any) {
    console.log(error);

    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      return res.send("Too many files to upload.");
    }
    return res.send(`Error when trying upload many files: ${error}`);
  }
};

export { singleUpload };
