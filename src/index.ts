import express, { type Express, type Request, type Response } from "express";
import mysql, { type RowDataPacket } from "mysql2/promise";
import "dotenv/config";

const app: Express = express();
const connection = await mysql.createPool({
  host: process.env.DB_HOST ?? "localhost",
  user: process.env.DB_USER ?? "root",
  password: process.env.DB_PASSWORD ?? "",
  database: process.env.DB_NAME ?? "test",
});

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

app.listen(process.env.PORT ?? 3000, () =>{
  console.log(`Server is running on port ${process.env.PORT ?? 3000}`);
});
