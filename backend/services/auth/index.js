import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { connectDb } from "./config/db.js";
import router from "./routes/auth.routes.js";




const PORT = process.env.PORT || 8001;
const app = express();


app.use(express.json());


app.use("/",router)

app.get("/", (req, res) => {
  res.send("Auth service is running");
});

app.listen(PORT, () => {
  connectDb();
  console.log(`Auth service running on port ${PORT}`);
});