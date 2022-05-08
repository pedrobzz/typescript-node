import * as dotenv from "dotenv";
dotenv.config();
import app from "./app";
import initializeDatabase from "./data";

const server = app.listen(4000, async () => {
  await initializeDatabase();
  console.log("listening at 4000");
});

export default server;
