import { type Request, type Response } from "express";
import { Order, OrderItem } from "../models/order.js";

export async function getCustomerOrdersWithItems(
  request: Request,
  response: Response,
) {
  const user_id = Number(request.params.id);
  const orders = await Order.findAll({
    where: { user_id },
    include: OrderItem,
  });

  response.json(orders);
}
