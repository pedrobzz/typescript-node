import { NextFunction, Request, Response } from "express";
import { getRequestRepo, RequestEntity } from "../../data";

const addRequestToDB = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const oldJSON = res.json;
  res.json = data => {
    res.locals.response = data;
    return oldJSON.call(res, data);
  };
  const requestRepo = await getRequestRepo();
  const request = new RequestEntity();
  request.route = req.originalUrl;
  request.source = req.headers["user-agent"];
  request.request = req;
  request.body = req.body;
  request.params = req.params;
  request.header = req.headers;
  await requestRepo.insert(request);
  req.headers = { ...req.headers, "request-id": request.id.toString() };
  next();
};

const handleErrorDB = async (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const requestRepo = await getRequestRepo();
  const request = await requestRepo.findOne({
    where: {
      id: Number(req.headers["request-id"]),
    },
  });
  if (request) {
    request.status = "error";
    request.response = { message: err.message, stack: err.stack };
    console.error({ message: err.message, stack: err.stack });
    await requestRepo.save(request);
  }
  res.status(500).json({ error: err.message });
};

const updateRequestDB = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const requestRepo = await getRequestRepo();
  const request = await requestRepo.findOne({
    where: {
      id: Number(req.headers["request-id"]),
    },
  });
  if (request) {
    request.status = "success";
    request.response = res.locals.response;
    await requestRepo.save(request);
  }
  next();
};

export { addRequestToDB, handleErrorDB, updateRequestDB };
