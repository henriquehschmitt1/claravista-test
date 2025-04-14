import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import CarModel from "../../src/models/CarModel.js";
import CarSchema from "../../src/schemas/CarSchema.js";

let mongoServer;
let model;

const validCar = {
  placa: "ABC1234",
  chassi: "1HGCM82633A123456",
  renavam: "12345678901",
  modelo: "Civic",
  marca: "Honda",
  ano: 2023,
};

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri(), { dbName: "test" });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(() => {
  model = new CarModel();
});

afterEach(async () => {
  await CarSchema.deleteMany({});
});

describe("CarModel", () => {
  test("should create a car successfully", async () => {
    const car = await model.createCar(validCar);
    expect(car).toBeDefined();
    expect(car.placa).toBe("ABC1234");
  });

  test("should get a car by ID", async () => {
    const created = await model.createCar(validCar);
    const found = await model.getCarById(created._id);
    expect(found).toBeDefined();
    expect(found._id.toString()).toBe(created._id.toString());
  });

  test("should get all cars", async () => {
    await model.createCar(validCar);
    const cars = await model.getCars();
    expect(cars.length).toBe(1);
  });

  test("should update a car", async () => {
    const created = await model.createCar(validCar);
    const updated = await model.updateCar(created._id, { modelo: "Fit" });
    expect(updated.modelo).toBe("Fit");
  });

  test("should soft delete a car", async () => {
    const created = await model.createCar(validCar);
    const deleted = await model.deleteCarById(created._id);
    expect(deleted.deletedAt).toBeInstanceOf(Date);

    const cars = await model.getCars();
    expect(cars.length).toBe(0);
  });

  test("should throw validation error on invalid renavam", async () => {
    await expect(
      model.createCar({ ...validCar, renavam: "abc" })
    ).rejects.toThrow("is not a valid renavam");
  });
});
