import express, { type Express } from "express";
import { sequelize } from "./conn.js";
import { getOrgTeamsWithMembers } from "./services/order-service.js";

const app: Express = express();

app.get("/org/:id", getOrgTeamsWithMembers);

sequelize.sync().then(() => {
  app.listen(process.env.PORT ?? 3000, () => {
    console.log(`Server is running on port ${process.env.PORT ?? 3000}`);
  });
});
