import { type Request, type Response } from "express";
import { Order, OrderItem } from "../models/order.js";
import { type Order_Status } from "../types/order.js";

export async function getCustomerOrdersWithItems(
  request: Request,
  response: Response,
): Promise<Order_Status> {
  const user_id = Number(request.params.id);
  const orders = await Order.findAll({
    where: { user_id },
    include: OrderItem,
  });

  const result = orders.length === 0 ? "NOT_FOUND" : "FOUND";
  let orderStatus: Order_Status;

  switch (result) {
    case "FOUND":
      orderStatus = {
        status: "FOUND",
        orders: orders.map((order) => order.toJSON()),
      };
      break;
    case "NOT_FOUND":
      orderStatus = { status: "NOT_FOUND", orders: [] };
      break;
    default:
      const exhaustiveCheck: never = result;
      return exhaustiveCheck;
  }
  return orderStatus;
}
