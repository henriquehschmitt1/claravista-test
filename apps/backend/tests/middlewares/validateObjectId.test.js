import mongoose from "mongoose";
import validateObjectId from "../../src/middlewares/validateObjectId.js";
import { jest } from "@jest/globals";

describe("validateObjectId middleware", () => {
  let req, res, next;

  beforeEach(() => {
    req = { params: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  test("Should call next if id is valid", () => {
    const validId = new mongoose.Types.ObjectId().toHexString();
    req.params.id = validId;

    validateObjectId(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  test("Should return 400 if id is not valid", () => {
    req.params.id = "invalid-id";

    validateObjectId(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "ID must be an ObjectID",
    });
    expect(next).not.toHaveBeenCalled();
  });
});
