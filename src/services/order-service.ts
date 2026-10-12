import { type Request, type Response } from "express";
import { Order, OrderItem } from "../models/order.js";

export async function getCustomerOrdersWithItems(
  request: Request,
  response: Response,
) {
  try {
    const user_id = Number(request.params.id);
    const orders = await Order.findAll({
      where: { user_id },
      include: OrderItem,
    });

    response.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching customer orders:", error);
    response.status(500).json({ error: "Internal Server Error" });
  }
}
