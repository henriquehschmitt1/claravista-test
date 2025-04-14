import request from "supertest";
import express from "express";
import { jest } from "@jest/globals";

jest.unstable_mockModule("../../src/middlewares/validateObjectId.js", () => ({
  default: (req, res, next) => next(),
}));

jest.unstable_mockModule("../../src/controllers/CarController.js", () => {
  return {
    default: jest.fn().mockImplementation(() => ({
      getCars: (req, res) => res.status(200).json({ message: "getCars" }),
      getCarById: (req, res) => res.status(200).json({ message: "getCarById" }),
      createCars: (req, res) => res.status(201).json({ message: "createCars" }),
      updateCars: (req, res) => res.status(200).json({ message: "updateCars" }),
      deleteCars: (req, res) => res.status(200).json({ message: "deleteCars" }),
    })),
  };
});

const carRoutes = (await import("../../src/routes/CarRoute.js")).default;

const app = express();
app.use(express.json());
app.use(carRoutes);

describe("Testando as rotas de Carro", () => {
  test("GET /cars - should return 200", async () => {
    const res = await request(app).get("/cars");
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("getCars");
  });

  test("GET /car/:id - should return 200", async () => {
    const res = await request(app).get("/car/123");
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("getCarById");
  });

  test("POST /car - should return 201", async () => {
    const res = await request(app)
      .post("/car")
      .send({ model: "Fiat Uno", year: 2020 });
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("createCars");
  });

  test("PUT /car/:id - should return 200", async () => {
    const res = await request(app)
      .put("/car/123")
      .send({ model: "Fiat Siena", year: 2021 });
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("updateCars");
  });

  test("DELETE /car/:id - should return 200", async () => {
    const res = await request(app).delete("/car/123");
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("deleteCars");
  });
});
