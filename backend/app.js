const express = require("express");
const connectDb = require("./src/mongo");

// routes
const userRoutes = require("./src/routes/user.route");

const app = express();
const port = 8000;

app.use(express.json());

connectDb().then(() => {
  console.log("Database connected");
});

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.use("/", userRoutes);

app.listen(port);
