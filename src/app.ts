import express from "express";
import helloRoute from "./routes/Hello/hello.controller";

const app = express();

app.use("/", helloRoute);

export default app;
