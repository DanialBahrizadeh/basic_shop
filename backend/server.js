import express, { json } from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoute from "./routes/product.route.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/products", productRoute);

app.listen(PORT, () => {
  connectDB();
  console.log("Server is running on port: " + PORT);
});
