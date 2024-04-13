const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./Models/user");
const Employee = require("./Models/employee");
const adminRoutes = require("./Routes/adminRoutes");
const employeeRoutes = require("./Routes/employeeRoutes");
require("dotenv").config();
const PORT = process.env.PORT;

const path = require("path");
const app = express();
app.use(express.json());
app.use(cors());

const URL = process.env.mongoDB_URL;
mongoose
  .connect(URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/admin", adminRoutes);
app.use("/employees", employeeRoutes);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
