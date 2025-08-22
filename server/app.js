import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import apiRoutes from "./src/route/index.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use("/api", apiRoutes);

app.get("/", (res, _) => {
  res.send("hello");
});

export default app;
