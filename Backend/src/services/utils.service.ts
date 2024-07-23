import * as bcrypt from "bcrypt";
import { ProductCategories, Roles, Users } from "../models/index";
import { v4 as uuidv4 } from "uuid";
import { db } from "../config/db";

async function generateDefaultUser() {
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash("pass@12345", salt);
  let data = {
    id: uuidv4(),
    email: "admin@example.com",
    password: hashPassword,
    firstName: "Admin",
    lastName: "",
    refresh_token: "",
  };
  return Users.create(data);
}

function initialSeedData() {
  return new Promise(async (resolve, reject) => {
    const transaction = await db.transaction();
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash("pass@12345", salt);

    let categories = [
      {
        id: uuidv4(),
        name: "kemeja",
        created_user: "admin",
      },
      {
        id: uuidv4(),
        name: "kaos",
        created_user: "admin",
      },
      {
        id: uuidv4(),
        name: "celana",
        created_user: "admin",
      },
      {
        id: uuidv4(),
        name: "gaun",
        created_user: "admin",
      },
      {
        id: uuidv4(),
        name: "indomie",
        created_user: "admin",
      },
      {
        id: uuidv4(),
        name: "supermie",
        created_user: "admin",
      },
      {
        id: uuidv4(),
        name: "sarimie",
        created_user: "admin",
      },
      {
        id: uuidv4(),
        name: "popmie",
        created_user: "admin",
      },
    ];

    const _perm = PermissionList().map((p) => {
      return {
        ...p,
        selected: true,
      };
    });
    const roles = [
      {
        id: uuidv4(),
        name: "administrator",
        description: null,
        isActive: true,
        permissions: JSON.stringify(_perm),
      },
      {
        id: uuidv4(),
        name: "customer",
        description: null,
        isActive: true,
        permissions: JSON.stringify(_perm.slice(3)),
      },
    ];

    let userData = [
      {
        id: uuidv4(),
        email: "admin@example.com",
        password: hashPassword,
        firstName: "Admin",
        lastName: "",
        refresh_token: "",
        roleId: roles[0].id,
      },
      {
        id: uuidv4(),
        email: "customer@example.com",
        password: hashPassword,
        firstName: "Customer",
        lastName: "",
        refresh_token: "",
        roleId: roles[1].id,
      },
    ];

    try {
      await Promise.all([
        Users.bulkCreate(userData, { transaction }),
        ProductCategories.bulkCreate(categories, { transaction }),
        Roles.bulkCreate(roles, { transaction }),
      ]);

      await transaction.commit();

      resolve("success");
    } catch (error) {
      await transaction.rollback();
      reject(error);
    }
  });
}

function randomNumbersLetters(length: number = 10) {
  var text = "",
    possible =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%&";

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

function GetPagingData(data: any, limit: any) {
  const { count: totalItems, rows: result } = data;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, totalPages, result };
}

function GetPagination(page: any, size: any) {
  const limit = size ? +size : 10;
  const offset = page ? page * limit : 0;

  return { limit, offset };
}

const PermissionList = () => {
  return [
    {
      name: "Dashboard",
      description: "",
      selected: false,
    },
    {
      name: "Product",
      description: "",
      selected: false,
    },
    {
      name: "Category",
      description: "",
      selected: false,
    },
    {
      name: "Transaction",
      description: "",
      selected: false,
    },
  ];
};

export {
  generateDefaultUser,
  initialSeedData,
  randomNumbersLetters,
  GetPagingData,
  GetPagination,
  PermissionList,
};
