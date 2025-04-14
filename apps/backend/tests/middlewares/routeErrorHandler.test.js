import routeErrorHandler from "../../src/middlewares/routeErrorHandler.js";
import { jest } from "@jest/globals";

describe("routeErrorHandler middleware", () => {
  let req, res;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  test("Should call route if everything is ok", async () => {
    const mockRoute = jest.fn(async (req, res) => {
      res.status(200).json({ message: "ok" });
    });

    const wrapped = routeErrorHandler(mockRoute);
    await wrapped(req, res);

    expect(mockRoute).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: "ok" });
  });

  test("Should return 400 if theres a Validation error on the API", async () => {
    const validationError = new Error("Validation failed");
    validationError.name = "ValidationError";
    validationError.errors = {
      model: { message: "Model is required" },
      year: { message: "Year must be valid" },
    };

    const mockRoute = jest.fn().mockRejectedValue(validationError);

    const wrapped = routeErrorHandler(mockRoute);
    await wrapped(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      error: ["Model is required", "Year must be valid"],
    });
  });

  test("Should return 400 if error 11000 occurs", async () => {
    const duplicateError = new Error("Duplicate key");
    duplicateError.code = 11000;

    const mockRoute = jest.fn().mockRejectedValue(duplicateError);

    const wrapped = routeErrorHandler(mockRoute);
    await wrapped(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      error: "Chassi, Renavam or Placa already exists",
    });
  });

  test("deve retornar 500 com mensagem genérica se erro não for tratado", async () => {
    const unknownError = new Error("Unexpected error");

    const mockRoute = jest.fn().mockRejectedValue(unknownError);

    const wrapped = routeErrorHandler(mockRoute);
    await wrapped(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      errorMessage: "Unexpected error",
    });
  });
});
