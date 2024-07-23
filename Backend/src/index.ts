import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import http from "http";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import storage from "./storage/index";
import router from "./routes";
import { initialSeedData } from "./services/utils.service";
import { Users } from "./models/index";
Users
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);

// let whitelist = ["http://localhost:5173"];
// let corsOptions = {
//   origin: function (origin: any, callback: any) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
// };

app.use(cors({ credentials: true, origin: "*" }));

app.use(express.json({ limit: "10mb", type: "application/json" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use(bodyParser.json({ limit: "10mb", type: "application/json" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));

app.use("/assets", express.static(path.join(__dirname, "files")));
app.use("/", router);
// app.use("/", cors(corsOptions), router);
app.use("/storage", storage);

app.get("/seed", async (req: Request, res: Response) => {
  initialSeedData()
    .then(() => {})
    .catch((error) => {
      console.log(error);
    });
  res.send("Express + TypeScript Server");
});

server.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
