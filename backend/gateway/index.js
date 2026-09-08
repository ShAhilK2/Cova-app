import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import proxy from "express-http-proxy";
import { protect } from "./middleware/protect.js";
import { getCurrentUser } from "./controller/user.controller.js";
import { proxyWithHeaders } from "./utils/proxyWithHeaders.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.json());


// Proxy routes
app.use("/api/auth", proxy(process.env.AUTH_SERVICE_URL));
app.use("/api/project",protect, proxyWithHeaders(process.env.PROJECT_SERVICE_URL));
app.get("/api/me",protect, getCurrentUser);


app.get("/", (req, res) => {
  res.send("Gateway server is running");
});

app.listen(PORT, () => {
  console.log(`Gateway server running on port ${PORT}`);
});