const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
app.use(cors());
app.use(express.json());
require("dotenv").config();
mongoose
  .connect(
    "mongodb+srv://jagadeeshgajula9:vH01O2bqzlh1BRYN@cluster0.cztnhxp.mongodb.net/EMPLDB1?retryWrites=true&w=majority&appName=Cluster0"
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

app.listen(3001, () => {
  console.log("server running on port 3001");
});
