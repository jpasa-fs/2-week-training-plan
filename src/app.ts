import express, { type Express } from "express";
import { getCustomerOrdersWithItems } from "./services/order-service.js";
const app: Express = express();

app.get("/order/:id", getCustomerOrdersWithItems);

export default app;