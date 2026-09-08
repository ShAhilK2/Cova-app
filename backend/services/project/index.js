import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { connectDb } from "./config/db.js";
import router from "./router/project.routes.js";





const PORT = process.env.PORT || 8002;
const app = express();


app.use(express.json());


app.use("/",router)


app.get("/", (req, res) => {
  res.send("Project service is running");
});

app.listen(PORT, () => {
  connectDb();
  console.log(`Project service running on port ${PORT}`);
});