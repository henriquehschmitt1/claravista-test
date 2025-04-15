import express from "express";
import indexRouter from "./routes/CarRoute.js";
import cors from "cors";

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
    // this.swagger();
  }

  middlewares() {
    this.server.use(
      cors({
        origin: "http://localhost:3001",
        methods: ["GET", "POST", "PUT", "DELETE"],
      })
    );

    this.server.use(express.json());
  }

  routes() {
    this.server.use("/", indexRouter);
  }

  // swagger() {
  // 	this.server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  // }
}

export default new App().server;
