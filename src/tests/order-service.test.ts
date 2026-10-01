import test, { after, before } from "node:test";
import assert from "node:assert";
import { sequelize } from "../conn.js";
import { Order, OrderItem } from "../models/order.js";
import { getCustomerOrdersWithItems } from "../services/order-service.js";
import type { Order_Status } from "../types/order.js";

before(async () => {
  await sequelize.sync({ force: true });
  const order = await Order.create({ name: "Test order", user_id: 1 });
  await OrderItem.create({
    name: "Test item",
    sku: "TEST-001",
    price: 100,
    order_id: order.get("id"),
  });
});

after(async () => {
  await sequelize.close();
});

test("should return status as FOUND when orders exist for a user", async () => {
  const response = {} as any;
  const request = {} as any;

  request.params = { id: "1" }; // Get orders for user with id 1
  const result: Order_Status = await getCustomerOrdersWithItems(
    request,
    response,
  );
  assert.equal(result.status, "FOUND");
});

test("should return status as NOT_FOUND when no orders exist for a user", async () => {
  const response = {} as any;
  const request = {} as any;

  request.params = { id: "3" }; // Get orders for user with id 3
  const result: Order_Status = await getCustomerOrdersWithItems(
    request,
    response,
  );
  assert.equal(result.status, "NOT_FOUND");
});
