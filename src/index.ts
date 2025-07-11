import "dotenv/config";
import express from "express";
import "./db/index";
import authRouter from "./routes/AuthRoute";

const app = express();
const port = 3000;

// Middleware
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/auth", authRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
