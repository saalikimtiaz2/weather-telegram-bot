import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
const { handler } = require("./controller");

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());
// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

app.post("*", async (req: Request, res: Response) => {
  res.send(await handler(req));
});

app.get("*", async (req: Request, res: Response) => {
  res.send(await handler(req));
});

app.listen(port, () => {
  console.log(`[SERVER]: Server is running at http://localhost:${port}`);
});
