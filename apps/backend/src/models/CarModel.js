import CarSchema from "../schemas/CarSchema.js";

function withDbErrorHandling(fn) {
  return async function (...args) {
    try {
      return await fn(...args);
    } catch (err) {
      const message = err.message || "Database operation failed";
      const status = err.status || 500;

      const dbError = new Error(message);
      dbError.status = status;
      dbError.originalError = err;

      throw dbError;
    }
  };
}

export default class CarModel {
  createCar = withDbErrorHandling(async (carData) => {
    const car = new CarSchema(carData);
    await car.validate();
    return car.save();
  });

  getCarById = withDbErrorHandling(async (carId) => {
    return CarSchema.findById(carId).notDeleted();
  });

  getCars = withDbErrorHandling(async () => {
    return CarSchema.find().notDeleted();
  });

  updateCar = withDbErrorHandling(async (carId, updateData) => {
    return CarSchema.findOneAndUpdate(
      { _id: carId, deletedAt: null },
      updateData,
      { new: true }
    );
  });

  deleteCarById = withDbErrorHandling(async (carId) => {
    return CarSchema.findByIdAndUpdate(
      carId,
      { deletedAt: new Date() },
      { new: true }
    );
  });
}
