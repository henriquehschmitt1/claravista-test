import express from "express";
import CarController from "../controllers/CarController.js";
import validateObjectId from "../middlewares/validateObjectId.js";
import routeErrorHandler from "../middlewares/routeErrorHandler.js";

const router = express.Router();
const carController = new CarController();

// function routeErrorHandler(route) {
//   return async (req, res) => {
//     try {
//       await route(req, res);
//     } catch (error) {
//       // if (error.name === "ValidationError") {
//       //   const messages = Object.values(error.errors).map((val) => val.message);
//       //   return res.status(400).json({
//       //     success: false,
//       //     error: messages,
//       //   });
//       // }
//       // if (error.code === 11000) {
//       //   return res.status(400).json({
//       //     success: false,
//       //     error: "Chassi, Renavam or Placa already exists",
//       //   });
//       // }
//       const errorMessage = error.message || "Internal server error";
//       res.status(error.status || 500).json({ errorMessage });
//     }
//   };
// }

router.get("/cars", routeErrorHandler(carController.getCars));
router.get(
  "/car/:id",
  validateObjectId,
  routeErrorHandler(carController.getCarById)
);

router.post("/car", routeErrorHandler(carController.createCars));

router.put("/car/:id", routeErrorHandler(carController.updateCars));

router.delete("/car/:id", routeErrorHandler(carController.deleteCars));

export default router;
