import express from "express";
import CarController from "../controllers/CarController.js";
import validateObjectId from "../middlewares/validateObjectId.js";
import routeErrorHandler from "../middlewares/routeErrorHandler.js";

const router = express.Router();
const carController = new CarController();

router.get("/cars", routeErrorHandler(carController.getCars));
router.get(
  "/car/:id",
  validateObjectId,
  routeErrorHandler(carController.getCarById)
);

router.post("/car", routeErrorHandler(carController.createCars));

router.put(
  "/car/:id",
  validateObjectId,
  routeErrorHandler(carController.updateCars)
);

router.delete(
  "/car/:id",
  validateObjectId,
  routeErrorHandler(carController.deleteCars)
);

export default router;
