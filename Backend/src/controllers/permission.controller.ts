import express, { Express, Request, Response } from "express";
import { PermissionList } from "../services/utils.service";
const router = express.Router();

router.get("/", (req, res) => {
  return res.json(PermissionList);
});

export default router;
