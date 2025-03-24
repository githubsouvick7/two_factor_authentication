const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoute = require("./auth/auth.route");
const app = express();
require("dotenv").config();

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoute);

mongoose
  .connect(process.env.MONGODB_CLIENT_ID)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.listen(process.env.PORT, (req, res) => {
  console.log(`Server running on port ${process.env.PORT}`);
});
