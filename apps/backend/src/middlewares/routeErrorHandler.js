const routeErrorHandler = (route) => {
  return async (req, res) => {
    try {
      await route(req, res);
    } catch (error) {
      if (error.name === "ValidationError") {
        const messages = Object.values(error.errors).map((val) => val.message);
        return res.status(400).json({
          success: false,
          error: messages,
        });
      }
      if (error.code === 11000) {
        return res.status(400).json({
          success: false,
          error: "Chassi, Renavam or Placa already exists",
        });
      }
      const errorMessage = error.message || "Internal server error";
      res.status(error.status || 500).json({ errorMessage });
    }
  };
};
export default routeErrorHandler;
