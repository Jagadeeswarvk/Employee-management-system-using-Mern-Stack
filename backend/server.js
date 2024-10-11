const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
app.use(cors());
app.use(express.json());
require("dotenv").config();
mongoose
  .connect(
    process.env.DB_CONNECT
  )
  .then(() => {
    console.log("mongodb connected");
  })
  .catch((error) => {
    console.log("error connecting to mongodb ", error);
  });

const userRoutes = require("./routes/userRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
app.use("/users", userRoutes);
app.use("/employee", employeeRoutes);

app.listen(process.env.PORT, () => {
  console.log("server running on port 3001");
});
