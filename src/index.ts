import "dotenv/config";
import express from "express";
import "./db/index";
import authRouter from "./routes/AuthRoute";
import { errorHandler, NotFound } from "./middlewares/errorMiddleware";

const app = express();
const port = 3000;

// Middleware
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/auth", authRouter);

app.use(NotFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
