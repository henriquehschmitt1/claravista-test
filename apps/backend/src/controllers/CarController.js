import CarService from "../services/CarService.js";

const carService = new CarService();

export default class CarController {
  async getCars(req, res) {
    const cars = await carService.getCars();
    res.status(200).json(cars);
  }

  async getCarById(req, res) {
    const { id } = req.params;
    const car = await carService.getCarById(id);
    res.status(200).json(car);
  }

  async createCars(req, res) {
    const { placa, chassi, renavam, modelo, marca, ano } = req.body;
    const car = await carService.createCar({
      placa,
      chassi,
      renavam,
      modelo,
      marca,
      ano,
    });

    res.status(201).json({
      success: true,
      data: car,
    });
  }

  async updateCars(req, res) {
    const { id } = req.params;
    const updatedData = req.body;
    const updatedCar = await carService.updateCar(id, updatedData);
    res.status(200).json({
      message: `Car with ID: ${id} updated successfully`,
      updatedCar,
    });
  }

  async deleteCars(req, res) {
    const { id } = req.params;
    await carService.deleteCarById(id);
    res
      .status(200)
      .json({ message: `Car with ID: ${id} deleted successfully` });
  }
}
