import express, { urlencoded } from "express";

const app = express();
const port = 8000;

app.use(urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("projeto ales");
});

app.listen(port);
