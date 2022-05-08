import "reflect-metadata";
import express from "express";
import crudRouter from "./routes/CRUD/crud.controller";
import { handleErrorDB, updateRequestDB } from "./routes/CRUD/crud.middleware";

const app = express();
app.use(express.json());

app.use("/", crudRouter);
app.use(updateRequestDB);
app.use(handleErrorDB);

export default app;
