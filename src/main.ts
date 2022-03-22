import express from "express";
import helloRoute from "./routes/Hello/hello.controller";

const app = express();

app.use("/", helloRoute);

const server = app.listen(3000, () => {
  console.log("listening at 3000");
});

export default server;
