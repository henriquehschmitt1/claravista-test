import { jest } from "@jest/globals";

// Mockando o CarModel
const mockModel = {
  getCars: jest.fn(),
  getCarById: jest.fn(),
  createCar: jest.fn(),
  updateCar: jest.fn(),
  deleteCarById: jest.fn(),
};

jest.unstable_mockModule("../../src/models/CarModel.js", () => ({
  default: jest.fn().mockImplementation(() => mockModel),
}));

const { default: CarService } = await import(
  "../../src/services/CarService.js"
);

describe("CarService", () => {
  let service;

  beforeEach(() => {
    service = new CarService();
    jest.clearAllMocks();
  });

  describe("getCars", () => {
    test("Should return cars", async () => {
      const cars = [{ modelo: "Civic" }];
      mockModel.getCars.mockResolvedValue(cars);

      const result = await service.getCars();
      expect(result).toBe(cars);
    });

    test("Should throw error if no cars was found", async () => {
      mockModel.getCars.mockResolvedValue([]);

      await expect(service.getCars()).rejects.toThrow("No cars found");
    });
  });

  describe("getCarById", () => {
    test("Should return car", async () => {
      const car = { modelo: "Fusca" };
      mockModel.getCarById.mockResolvedValue(car);

      const result = await service.getCarById("123");
      expect(result).toBe(car);
    });

    test("Should throw error if no car was found", async () => {
      mockModel.getCarById.mockResolvedValue(null);

      await expect(service.getCarById("123")).rejects.toThrow(
        "Car was not found"
      );
    });
  });

  describe("createCar", () => {
    test("Should create a car", async () => {
      const carData = { modelo: "Onix" };
      const carCreated = { ...carData, _id: "abc" };
      mockModel.createCar.mockResolvedValue(carCreated);

      const result = await service.createCar(carData);
      expect(result).toBe(carCreated);
    });

    test("Should throw error if car creation fails", async () => {
      mockModel.createCar.mockResolvedValue(null);

      await expect(service.createCar({ modelo: "Fail" })).rejects.toThrow(
        "Failed to create car"
      );
    });
  });

  describe("updateCar", () => {
    test("Should update and return a car", async () => {
      const updated = { modelo: "HB20", ano: 2023 };
      mockModel.updateCar.mockResolvedValue(updated);

      const result = await service.updateCar("456", updated);
      expect(result).toBe(updated);
    });

    test("Should throw an error if car was not found by id", async () => {
      mockModel.updateCar.mockResolvedValue(null);

      await expect(service.updateCar("456", {})).rejects.toThrow(
        "Car was not found"
      );
    });
  });

  describe("deleteCarById", () => {
    test("Should delete a car by id", async () => {
      const deleted = { modelo: "Corsa" };
      mockModel.deleteCarById.mockResolvedValue(deleted);

      const result = await service.deleteCarById("789");
      expect(result).toBe(deleted);
    });

    test("Should throw an error if no car was found", async () => {
      mockModel.deleteCarById.mockResolvedValue(null);

      await expect(service.deleteCarById("789")).rejects.toThrow(
        "Car was not found"
      );
    });
  });
});
