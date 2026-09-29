import { DataTypes } from "sequelize";
import { sequelize } from "../conn.js";

export const Order = sequelize.define(
  "Order",
  {
    name: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
  },
  {
    tableName: "orders",
    timestamps: false,
  },
);

export const OrderItem = sequelize.define(
  "OrderItem",
  {
    name: DataTypes.STRING,
    sku: DataTypes.STRING,
    price: DataTypes.INTEGER,
    order_id: DataTypes.INTEGER,
  },
  {
    tableName: "order_items",
    timestamps: false,
  },
);

Order.hasMany(OrderItem, { foreignKey: "order_id" });
OrderItem.belongsTo(Order, { foreignKey: "order_id" });
