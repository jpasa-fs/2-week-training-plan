import test from "node:test";
import assert from "node:assert";
import { getCustomerOrdersWithItems } from "../services/order-service.js";
import type { Order_Status } from "../types/order.js";

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
