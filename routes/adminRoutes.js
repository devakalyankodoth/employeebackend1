const express = require("express");
const router = express.Router();
const UserModel = require("../Models/user");
const Employee =require("../Models/employee");
const jwt = require("jsonwebtoken");
const { adminSignup, adminLogin, employeeDataSave, employeeEdit, employeeDelete, employeeDataPrefill } = require("../Controller/adminController");
router.post("/admin/signup",adminSignup );
   router.post("/admin/login",adminLogin );
  router.post("/employees",employeeDataSave );

  router.put("/employees/:id", employeeEdit);

  router.delete("/employees/:id",employeeDelete);
  router.get("/employees/:id",employeeDataPrefill );
  
  module.exports = router;