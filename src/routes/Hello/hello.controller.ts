import { Router } from "express";

const helloRoute = Router();

helloRoute.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello, World!",
  });
});

export default helloRoute;
