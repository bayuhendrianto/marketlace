import upload from "./upload";
const originUrl = "http://localhost:3000/";

const multipleUpload = async (req: any, res: any) => {
  try {
    await upload(req, res);
    const { locationFile } = req.params;
    if (req.files.length <= 0) {
      return res.send(`You must select at least 1 file.`);
    }

    let response = new Array();
    req.files.forEach((file: any) => {
      response.push({
        fileName: file.filename,
        url: originUrl + `assets/${locationFile}/` + file.filename,
      });
    });

    return res.send({
      status: "success",
      response: response,
    });
  } catch (error: any) {
    console.log(error);

    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      return res.status(400).send("Too many files to upload.");
    }
    return res
      .status(400)
      .send(`Error when trying upload many files: ${error}`);
  }
};

export { multipleUpload };
