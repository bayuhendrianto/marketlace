import express, { Express, Request, Response } from "express";
const router = express.Router();
import { Products, ProductVarians } from "../models/index";

import { v4 as uuidv4 } from "uuid";

import { GetPagination, GetPagingData } from "../services/utils.service";
import { Op } from "sequelize";
import { db } from "../config/db";

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
      include: [
        {
          model: ProductVarians,
        },
      ],
      limit: limit,
      offset: offset,
    });

    const response = GetPagingData(products, limit);
    return res.status(200).json(response);
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error get products", error: error });
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
  const transaction = await db.transaction();
  console.log(req.body)
  try {
    let data = { ...req.body.product, id: uuidv4() };
    let productVariants = [...req.body.productVariant].map((item: any) => {
      return {
        ...item,
        id: uuidv4(),
        productId: data.id,
      };
    });

    await Promise.all([
      Products.create(data, { transaction }),
      ProductVarians.bulkCreate(productVariants, { transaction }),
    ]);

    await transaction.commit();

    return res.status(200).json({ message: "Product created !" });
  } catch (error) {
    console.log(error);
    await transaction.rollback();
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
