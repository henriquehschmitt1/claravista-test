import CarModel from "../models/CarModel.js";
const carModel = new CarModel();

export default class CarService {
  wasFound(condition, status, message) {
    if (!condition) {
      const error = new Error(message);
      error.status = status;
      throw error;
    }
  }

  async getCars() {
    const cars = await carModel.getCars();
    this.wasFound(cars.length, 404, "No cars found");
    return cars;
  }

  async getCarById(id) {
    const car = await carModel.getCarById(id);
    this.wasFound(car, 404, "Car was not found");
    return car;
  }

  async createCar(carData) {
    const car = await carModel.createCar(carData);
    this.wasFound(car, 400, "Failed to create car");
    return car;
  }

  async updateCar(id, updateData) {
    const car = await carModel.updateCar(id, updateData);
    this.wasFound(car, 404, "Car was not found");
    return car;
  }

  async deleteCarById(id) {
    const car = await carModel.deleteCarById(id);
    this.wasFound(car, 404, "Car was not found");
    return car;
  }
}
