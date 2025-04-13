import mongoose from "mongoose";
import validator from "validator";
const { isAlphanumeric, isNumeric, isLength } = validator;

const carSchema = new mongoose.Schema(
  {
    placa: {
      type: String,
      required: [true, "Placa is required"],
      unique: true,
      validate: {
        validator: function (v) {
          // Brazilian license plate format (AAA-9999 or AAA9A99)
          return /^[A-Z]{3}-?\d{4}$|^[A-Z]{3}\d[A-Z]\d{2}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid placa format!`,
      },
      uppercase: true,
      trim: true,
    },
    chassi: {
      type: String,
      required: [true, "Chassi is required"],
      unique: true,
      validate: {
        validator: function (v) {
          // Chassis number should be 17 alphanumeric characters
          return isLength(v, { min: 17, max: 17 }) && isAlphanumeric(v);
        },
        message: (props) =>
          `${props.value} is not a valid chassi! Must be 17 alphanumeric characters.`,
      },
      uppercase: true,
      trim: true,
    },
    renavam: {
      type: String,
      required: [true, "Renavam is required"],
      unique: true,
      validate: {
        validator: function (v) {
          // Renavam should be 11 digits
          return isLength(v, { min: 11, max: 11 }) && isNumeric(v);
        },
        message: (props) =>
          `${props.value} is not a valid renavam! Must be 11 digits.`,
      },
      trim: true,
    },
    modelo: {
      type: String,
      required: [true, "Modelo is required"],
      maxlength: 64,
      trim: true,
    },
    marca: {
      type: String,
      required: [true, "Marca is required"],
      maxlength: 64,
      trim: true,
    },
    ano: {
      type: Number,
      required: [true, "Ano is required"],
      min: [1900, "Ano must be at least 1900"],
      max: [
        new Date().getFullYear() + 1,
        `Ano cannot be in the future beyond ${new Date().getFullYear() + 1}`,
      ],
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

carSchema.query.notDeleted = function () {
  return this.where({ deletedAt: null });
};

carSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.__v;
    delete ret.createdAt;
    delete ret.deletedAt;
    return ret;
  },
});

const CarSchema = mongoose.model("cars", carSchema);

export default CarSchema;
