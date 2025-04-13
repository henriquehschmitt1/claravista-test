import mongoose from "mongoose";
import dotenv from "dotenv";
import CarSchema from "../schemas/CarSchema.js";

dotenv.config();

const connectDB = async () => {
  try {
    const dbUri = process.env.MONGODB_URI;

    await mongoose.connect(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected successfully");

    await mongoose.connection.db.createCollection("cars").catch((err) => {
      if (err.codeName === "NamespaceExists") {
        console.log("Cars collection already exists. Ignoring creation.");
      } else {
        throw err;
      }
    });
    await CarSchema.init();

    console.log("Cars collection initialized successfully");
    await mongoose.disconnect();
  } catch (err) {
    console.error("Erro durante inicialização do banco:", err);
    process.exit(1);
  }
};

connectDB();
