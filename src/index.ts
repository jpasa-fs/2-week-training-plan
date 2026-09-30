import express, { type Express, type Request, type Response } from "express";
import mysql, { type RowDataPacket } from "mysql2/promise";
import type { User } from "./user.js";
import { sendGreeting } from "./user-service.js";
import "dotenv/config";

type UserRow = User & RowDataPacket;

const app: Express = express();
const connection = await mysql.createPool({
  host: process.env.DB_HOST ?? "localhost",
  user: process.env.DB_USER ?? "root",
  password: process.env.DB_PASSWORD ?? "",
  database: process.env.DB_NAME ?? "test",
});

app.get("/", async (_request: Request, response: Response) => {
  try {
    const [users] = await connection.query<UserRow[]>("SELECT * FROM users");
    const user = users[0];
    if (!user) {
      response.status(404).send("No users found");
      return;
    }

    const greeting = sendGreeting(user);
    response.json(greeting);
  } catch (error) {
    console.error(error);
    response.status(500).send("Internal Server Error");
  }
});

app.listen(process.env.PORT ?? 3000, () => {
  console.log(`Server is running on port ${process.env.PORT ?? 3000}`);
});
