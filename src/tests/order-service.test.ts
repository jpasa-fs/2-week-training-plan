import assert from "node:assert/strict";
import { test } from "node:test";
import type { Request, Response } from "express";
import { connection } from "../conn.js";
import {
  getOrderSummary,
  thirdPartyPricingApi,
} from "../services/order-service.js";

test("returns order data with status 200 when pricing API rejects", async (t) => {
  const order = { order_id: "42", item: "Training plan" };

  t.mock.method(connection, "query", async () => [[order], []]);
  t.mock.method(thirdPartyPricingApi, "getCurrentPrice", async () => {
    throw new Error("Pricing API unavailable");
  });

  let responseStatusCode = 200;
  let responseBody: unknown;
  const response = {
    status(code: number) {
      responseStatusCode = code;
      return this;
    },
    json(body: unknown) {
      responseBody = body;
      return this;
    },
  } as Response;
  const request = { params: { id: "42" } } as unknown as Request;

  await getOrderSummary(request, response);

  assert.equal(responseStatusCode, 200);
  assert.deepEqual(responseBody, {
    order: [order],
    cached: [],
    livePrice: null,
  });
});
