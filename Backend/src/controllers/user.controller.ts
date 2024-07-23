import express, { Express, Request, Response } from "express";
const router = express.Router();
import { Users } from "../models/index";

import { v4 as uuidv4 } from "uuid";
import * as bcrypt from "bcrypt";

import { GetPagination, GetPagingData } from "../services/utils.service";
import { Op } from "sequelize";

router.get("/", async (req, res) => {
  let { page, size, search } = req.query;
  const { limit, offset } = GetPagination(page, size);
  search = search ? search : "";
  try {
    const users = await Users.findAndCountAll({
      order: [["firstName", "ASC"]],
      where: {
        [Op.or]: [
          {
            email: {
              [Op.like]: ["%" + search + "%"],
            },
          },
          {
            firstName: {
              [Op.like]: ["%" + search + "%"],
            },
          },
          {
            lastName: {
              [Op.like]: ["%" + search + "%"],
            },
          },
        ],
      },
      limit: limit,
      offset: offset,
    });

    const response = GetPagingData(users, limit);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ message: "Error get users" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Users.findByPk(id);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ message: "Error get user" });
  }
});

router.post("/create", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash("pass@12345", salt);

    let data = { ...req.body, id: uuidv4(), password: hashPassword };
    await Users.create(data);

    return res.status(200).json({ message: "User created !" });
  } catch (error) {
    return res.status(400).json({ message: "Error create user" });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;

    let data = { ...req.body };
    await Users.update(data, { where: { id: id } });

    return res.status(200).json({ message: "User updated !" });
  } catch (error) {
    return res.status(400).json({ message: "Error create user" });
  }
});

export default router;
