import CarSchema from "../schemas/CarSchema.js";

export default class CarModel {
  async createCar(carData) {
    const car = new CarSchema(carData);
    await car.validate();
    return car.save();
  }

  async getCarById(carId) {
    return CarSchema.findById(carId).notDeleted();
  }

  async getCars() {
    return CarSchema.find().notDeleted();
  }

  async updateCar(carId, updateData) {
    return CarSchema.findOneAndUpdate(
      { _id: carId, deletedAt: null },
      updateData,
      { new: true }
    );
  }

  async deleteCarById(carId) {
    return CarSchema.findByIdAndUpdate(
      carId,
      { deletedAt: new Date() },
      { new: true }
    );
  }
}
