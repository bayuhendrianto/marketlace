import express, { Express, Request, Response } from "express";
const router = express.Router();
import { Products } from "../models/index";

import { v4 as uuidv4 } from "uuid";

import { GetPagination, GetPagingData } from "../services/utils.service";
import { Op } from "sequelize";

router.get("/", async (req, res) => {
  let { page, size, search } = req.query;
  const { limit, offset } = GetPagination(page, size);
  search = search ? search : "";
  try {
    const products = await Products.findAndCountAll({
      order: [["name", "ASC"]],
      where: {
        [Op.or]: [
          {
            name: {
              [Op.like]: ["%" + search + "%"],
            },
          },
        ],
      },
      limit: limit,
      offset: offset,
    });

    const response = GetPagingData(products, limit);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ message: "Error get products" });
  }
});

router.get("/", async (req, res) => {
  let { page, size, search } = req.query;
  const { limit, offset } = GetPagination(page, size);
  search = search ? search : "";
  try {
    const products = await Products.findAndCountAll({
      order: [["name", "ASC"]],
      where: {
        [Op.or]: [
          {
            name: {
              [Op.like]: ["%" + search + "%"],
            },
          },
        ],
      },
      limit: limit,
      offset: offset,
    });

    const response = GetPagingData(products, limit);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ message: "Error get products" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Products.findByPk(id);
    return res.status(200).json(product);
  } catch (error) {
    return res.status(400).json({ message: "Error get product" });
  }
});

router.post("/create", async (req, res) => {
  try {
    let data = { ...req.body, id: uuidv4() };
    await Products.create(data);

    return res.status(200).json({ message: "Product created !" });
  } catch (error) {
    return res.status(400).json({ message: "Error create Product" });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;

    let data = { ...req.body };
    await Products.update(data, { where: { id: id } });

    return res.status(200).json({ message: "Product updated !" });
  } catch (error) {
    return res.status(400).json({ message: "Error create product" });
  }
});

export default router;
