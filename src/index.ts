import express, { type Express, type Request, type Response } from "express";
import type { RowDataPacket } from "mysql2";
import { connection } from "./conn.js";
import { getOrderSummary } from "./services/order-service.js";


const app: Express = express();

app.get("/", async (_request: Request, response: Response) => {
  try {
    const [users] = await connection.query<RowDataPacket[]>(
      "SELECT * FROM users",
    );
    response.send(`Welcome ${users[0]?.name ?? "Guest"}!`);
  } catch (error) {
    console.error(error);
    response.status(500).send("Internal Server Error");
  }
});

app.get("/order/:id", getOrderSummary);

app.listen(process.env.PORT ?? 3000, () =>{
  console.log(`Server is running on port ${process.env.PORT ?? 3000}`);
});
