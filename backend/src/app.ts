import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import userRoutes from "./routes/userRoutes";
import dotenv from "dotenv";
import { notFoundHandler, errorHandler } from "./middlewares/errorMiddleware";
import cors from "cors";

const result = dotenv.config({
  path: "./src/.env",
});

if (result.error) {
  throw result.error;
}

console.log(result.parsed);
// Connect to MongoDB database
const app = express();
const PORT = process.env.PORT || 3000;

console.log({ Port: process.env.PORT });
// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api", userRoutes);
// 404 Handler
app.use(notFoundHandler);

// General Error Handler
app.use(errorHandler);
// MongoDB Connection
mongoose
  .connect(<string>process.env.MONGO_URI, {
    autoIndex: true,
  })

  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error(err));
