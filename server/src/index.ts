import express from "express";
import cors from "cors";

import messageRoutes from "./routes/message";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/message", messageRoutes);

app.listen(3000, () => {
  console.log("server running on 3000");
});