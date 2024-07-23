import { ProductCategories } from "./category.model";
import { Products, ProductVarians } from "./product.model";
import {
  Transactions,
  TransactionDetails,
  ShoppingCart,
  ShoppingCartDetails,
} from "./transaction.model";
import { Users } from "./user.model";
import { Roles } from "./role.model";

ProductCategories.hasMany(Products);
Products.hasMany(ProductVarians);
Transactions.hasMany(TransactionDetails);
ProductVarians.hasMany(TransactionDetails);
Roles.hasMany(Users);
ShoppingCart.hasMany(ShoppingCartDetails);
ProductVarians.hasMany(ShoppingCartDetails);

Users.belongsTo(Roles);
Products.belongsTo(ProductCategories);
ProductVarians.belongsTo(Products);
TransactionDetails.belongsTo(Transactions);
TransactionDetails.belongsTo(ProductVarians);
ShoppingCartDetails.belongsTo(ShoppingCart);
ShoppingCartDetails.belongsTo(ProductVarians);

export {
  ProductCategories,
  Products,
  ProductVarians,
  Transactions,
  TransactionDetails,
  Users,
  Roles,
  ShoppingCart,
  ShoppingCartDetails,
};
