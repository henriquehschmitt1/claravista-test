import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const dbUri = process.env.MONGODB_URI;

    await mongoose.connect(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

export default connectDB;
