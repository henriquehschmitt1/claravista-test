import mongoose from "mongoose";

const validateObjectId = (req, res, next) => {
  const { id } = req.params;

  const isValid = mongoose.Types.ObjectId.isValid(id);

  if (!isValid) {
    return res.status(400).json({ error: "ID must be an ObjectID" });
  }

  next();
};

export default validateObjectId;
