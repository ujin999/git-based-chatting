import express from "express";

const app = express();

app.use(express.json());

app.get("/", (_, res) => {
  res.send("Git Collab Server");
});

app.listen(3000, () => {
  console.log("server running on 3000");
});