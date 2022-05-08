import { Router } from "express";
import { AppDataSource, RequestEntity } from "../../data";
import { addRequestToDB } from "./crud.middleware";
const crudRouter = Router();

const requestRepo = AppDataSource.getRepository(RequestEntity);

crudRouter.get("/", async (req, res) => {
  const requests = await requestRepo.find({});
  return res.json(requests);
});

crudRouter.post("/create", addRequestToDB, async (req, res, next) => {
  try {
    if (req.body.error) throw new Error(req.body.error);
    res.json({
      success: true,
      message: "Request created successfully",
    });
    next();
  } catch (err) {
    next(err);
  }
});

export default crudRouter;
