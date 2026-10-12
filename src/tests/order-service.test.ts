import assert from "node:assert/strict";
import request from "supertest";
import test, { after, before } from "node:test";
import app from "../app.js";
import { sequelize } from "../conn.js";
import { Order, OrderItem } from "../models/order.js";

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

test("GET /order/:id returns orders and items for a user", async () => {
  const response = await request(app).get("/order/1");

  assert.equal(response.statusCode, 200);
  assert.equal(response.body.status, "FOUND");
  assert.equal(response.body.orders.length, 1);
  assert.equal(response.body.orders[0].name, "Test order");
  assert.equal(response.body.orders[0].user_id, 1);
  assert.equal(response.body.orders[0].OrderItems.length, 1);
  assert.equal(response.body.orders[0].OrderItems[0].name, "Test item");
  assert.equal(response.body.orders[0].OrderItems[0].sku, "TEST-001");
});

test("GET /order/:id returns NOT_FOUND when a user has no orders", async () => {
  const response = await request(app).get("/order/3");

  assert.equal(response.statusCode, 200);
  assert.deepEqual(response.body, { status: "NOT_FOUND", orders: [] });
});
