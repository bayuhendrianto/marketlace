import express, { Express, Request, Response } from "express";
const router = express.Router();

import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { Roles, Users } from "../models/index";

import { v4 as uuidv4 } from "uuid";
import moment from "moment";

router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  let data = { email, password } as any;

  for (let item in data) {
    if (data[item] === undefined) {
      return res.status(500).json({ message: `${item} is required !` });
    }
  }

  try {
    const user = await Users.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(403).json({ message: "User not found !" });
    }

    const match = await bcrypt.compare(password, user.getDataValue("password"));
    if (!match) return res.status(401).json({ message: "Wrong Password" });

    process.env.ACCESS_TOKEN_SECRET;

    const accessToken = jwt.sign(
      {
        userId: user.getDataValue("id"),
        name: user.getDataValue("firstName"),
        email: email,
        role: [],
      },
      "12345",
      {
        expiresIn: "1d",
      }
    );
    const refreshToken = jwt.sign(
      {
        userId: user.getDataValue("id"),
        name: user.getDataValue("firstName"),
        email: email,
      },
      "12345",
      {
        expiresIn: "2d",
      }
    );

    await Users.update(
      { refresh_token: refreshToken },
      {
        where: {
          id: user.getDataValue("id"),
        },
      }
    );

    const role = await Roles.findByPk(user.getDataValue("roleId"));

    return res.status(200).json({
      accessToken: accessToken,
      refreshToken: refreshToken,
      id: user.getDataValue("id"),
      email: user.getDataValue("email"),
      firstName: user.getDataValue("firstName"),
      lastName: user.getDataValue("lastName"),
      role: role
        ? {
            ...role.get(),
            permissions: JSON.parse(role.getDataValue("permissions")),
          }
        : null,
    });
  } catch (error) {
    return res.status(400).json({ message: "Login fail" });
  }
});

router.post("/reset-password/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const user = await Users.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(403).json({ message: "User not found !" });
    }

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash("pass@12345", salt);

    let userData = { ...user.get(), password: hashPassword };

    await Users.update(userData, { where: { id: userData.id } });

    return res.status(200).json({ message: "Reset password successfully" });
  } catch (error) {
    return res.status(200).json({ message: "Reset password failed" });
  }
});

router.post("/change-password", async (req, res) => {
  try {
    const { id, password } = req.body;
    const user = await Users.findOne(id);

    if (!user) {
      return res.status(403).json({ message: "User not found !" });
    }

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    let userData = { ...user.get(), password: hashPassword };

    await Users.update(userData, { where: { id: userData.id } });

    return res.status(200).json({ message: "Change password successfully" });
  } catch (error) {
    return res.status(200).json({ message: "Change password failed" });
  }
});

export default router;
