import express, { Express, Request, Response } from "express";
import multer from "multer";
import sharp from "sharp";
import fs from "fs";
import path from "path";

import { multipleUpload } from "./filecontroller";
import { singleUpload } from "./filecontroller-single";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });
const originUrl = "http://localhost:3000/";

router.get("/", (req, res) => {
  res.send("Storage");
});

router.post("/base64", (req: Request, res: Response) => {
  var matches = req.body.base64image.match(
    /^data:([A-Za-z-+\/]+);base64,(.+)$/
  );
  var path = req.body.path;
  if (matches.length !== 3) {
    return res.status(400).json({ status: "Invalid input string" });
  }

  let imageBuffer = Buffer.from(matches[2], "base64"),
    fileName = req.body.fileName;

  try {
    fs.writeFileSync("../files/" + path + "/" + fileName, imageBuffer, "utf8");
    res.send({
      status: "success",
      url: originUrl + "assets/" + path + "/" + fileName,
    });
  } catch (error) {
    console.log("Image uploaded failed :", error);
    return res.status(400).json({ status: "failed", error });
  }
});

router.post("/base64-resize", function (req, res, next) {
  let matches = req.body.base64image.match(
      /^data:([A-Za-z-+\/]+);base64,(.+)$/
    ),
    location = req.body.path,
    { width, height } = req.query as any;

  width = width ? Number(width) : 360;
  height = height ? Number(height) : 360;

  if (matches.length !== 3) {
    return new Error("Invalid input string");
  }

  let imageBuffer = Buffer.from(matches[2], "base64"),
    fileName = req.body.fileName;

  sharp(imageBuffer)
    .resize({ width: Number(width), height: Number(height) })
    .toFile(path.join(__dirname, `/files/${location}/${fileName}`))
    .then(() => {
      res.status(200).json({
        status: "success",
        url: originUrl + "assets/" + location + "/" + fileName,
      });
    })
    .catch((error: any) => {
      res.status(400).json({ status: "failed" });
      console.log("Image uploaded failed :", error);
      next({ message: "Error Uplaod", error: error });
    });
});

router.post("/upload-multiple/:locationFile", multipleUpload);
router.post("/upload-single/:locationFile", singleUpload);

export default router;
