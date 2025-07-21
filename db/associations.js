import sequelize from "./index.js";
import User from "../models/User.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import Category from "../models/Category.js";

User.hasMany(Order, {
  foreignKey: {
    allowNull: false,
    name: "userId",
  },
});
Order.belongsTo(User, {
  foreignKey: {
    allowNull: false,
    name: "userId",
  },
  onDelete: "CASCADE",
});

const OrderProducts = sequelize.define("OrderProducts");

Order.belongsToMany(Product, {
    foreignKey: {
      allowNull: false,
      name: "orderId",
    },
  through: "OrderProducts",
});

Product.belongsToMany(Order, {
    foreignKey: {
      allowNull: false,
      name: "orderId",
    },
  through: "OrderProducts",
});

Category.belongsToMany(Product, {
    foreignKey: {
      allowNull: false,
      name: "categoryId",
    },
  through: "CategoryProducts",
});
Product.belongsToMany(Category, {
  foreignKey: {
    allowNull: false,
    name: "categoryId",
  },
  onDelete: "CASCADE",
  through: "CategoryProducts",
});

sequelize.sync();

export { User, Product, Category, Order };
