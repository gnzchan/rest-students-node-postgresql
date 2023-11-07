require("dotenv").config();
const express = require("express");
const studentRoutes = require("./src/student/routes");

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.listen(port, () => {
  console.log(`app listening on PORT ${port}`);
});

app.use("/api/v1/students", studentRoutes);

app.get("/", (req, res) => {
  res.send("Hello world");
});
