import express, { Express, Request, Response } from "express";
const router = express.Router();
import { ProductCategories } from "../models/index";

import { v4 as uuidv4 } from "uuid";

import { GetPagination, GetPagingData } from "../services/utils.service";
import { Op } from "sequelize";

router.get("/", async (req, res) => {
  let { page, size, search } = req.query;
  const { limit, offset } = GetPagination(page, size);
  search = search ? search : "";
  try {
    const categories = await ProductCategories.findAndCountAll({
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

    const response = GetPagingData(categories, limit);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Error get categories" });
  }
});

router.get("/option", async (req, res) => {
  try {
    const categories = await ProductCategories.findAll({
      order: [["name", "ASC"]],
      attributes: ["id", "name"],
    });
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(400).json({ message: "Error get categories" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const category = await ProductCategories.findByPk(id);
    return res.status(200).json(category);
  } catch (error) {
    return res.status(400).json({ message: "Error get category" });
  }
});

router.post("/create", async (req, res) => {
  try {
    let data = { ...req.body, id: uuidv4() };
    await ProductCategories.create(data);

    return res.status(200).json({ message: "Product Category created !" });
  } catch (error) {
    return res.status(400).json({ message: "Error create category" });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;

    let data = { ...req.body };
    await ProductCategories.update(data, { where: { id: id } });

    return res.status(200).json({ message: "Product Category updated !" });
  } catch (error) {
    return res.status(400).json({ message: "Error create category" });
  }
});

export default router;
