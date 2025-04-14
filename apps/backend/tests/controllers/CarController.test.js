import { jest } from "@jest/globals";

const mockService = {
  getCars: jest.fn(),
  getCarById: jest.fn(),
  createCar: jest.fn(),
  updateCar: jest.fn(),
  deleteCarById: jest.fn(),
};

jest.unstable_mockModule("../../src/services/CarService.js", () => ({
  default: jest.fn().mockImplementation(() => mockService),
}));

const { default: CarController } = await import(
  "../../src/controllers/CarController.js"
);

describe("CarController", () => {
  let req, res, controller;

  beforeEach(() => {
    req = { params: {}, body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    controller = new CarController();
    jest.clearAllMocks();
  });

  test("getCars - Should return an array of cars", async () => {
    const mockCars = [{ modelo: "Uno" }];
    mockService.getCars.mockResolvedValue(mockCars);

    await controller.getCars(req, res);

    expect(mockService.getCars).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockCars);
  });

  test("getCarById - Should return a car by id", async () => {
    const mockCar = {
      placa: "XYZ1234",
      chassi: "ABCDEF1234567890",
      renavam: "12345678900",
      modelo: "Civic",
      marca: "Honda",
      ano: 2022,
    };
    req.params.id = "123";
    mockService.getCarById.mockResolvedValue(mockCar);

    await controller.getCarById(req, res);

    expect(mockService.getCarById).toHaveBeenCalledWith("123");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockCar);
  });

  test("createCars - Should create a car", async () => {
    const newCar = {
      placa: "XYZ1234",
      chassi: "ABCDEF1234567890",
      renavam: "12345678900",
      modelo: "Civic",
      marca: "Honda",
      ano: 2022,
    };

    const createdCar = { ...newCar, _id: "1" };

    req.body = newCar;
    mockService.createCar.mockResolvedValue(createdCar);

    await controller.createCars(req, res);

    expect(mockService.createCar).toHaveBeenCalledWith(newCar);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: createdCar,
    });
  });

  test("updateCars - Should return updated car and return expected message", async () => {
    req.params.id = "456";
    req.body = { modelo: "HB20", ano: 2023 };

    const updatedCar = { _id: "456", modelo: "HB20", ano: 2023 };
    mockService.updateCar.mockResolvedValue(updatedCar);

    await controller.updateCars(req, res);

    expect(mockService.updateCar).toHaveBeenCalledWith("456", req.body);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: `Car with ID: 456 updated successfully`,
      updatedCar,
    });
  });

  test("deleteCars - Should delete car and return expected message", async () => {
    req.params.id = "789";
    mockService.deleteCarById.mockResolvedValue();

    await controller.deleteCars(req, res);

    expect(mockService.deleteCarById).toHaveBeenCalledWith("789");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: `Car with ID: 789 deleted successfully`,
    });
  });
});
