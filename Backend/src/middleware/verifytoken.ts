import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.status(401).sendStatus(401);
  jwt.verify(token, "12345", (err, decoded) => {
    if (err) return res.status(403).sendStatus(403);
    next();
  });
};

export { verifyToken };
