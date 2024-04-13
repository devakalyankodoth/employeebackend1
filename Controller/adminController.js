const UserModel = require("../Models/user");
const Employee = require("../Models/employee");
const jwt = require("jsonwebtoken");

exports.adminSignup = async (req, res) => {
  try {
    const user = await UserModel.create({ ...req.body, role: "admin" });
    res.json(user);
  } catch (err) {
    console.error("Error occurred while signing up:", err);
    res.status(400).json(err);
  }
};

exports.adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await UserModel.findOne({ username, role: "admin" });
    if (admin) {
      if (admin.password === password) {
        const payload = { adminId: admin._id };
        const token = jwt.sign(payload, "reactblogapp");
        res.json({ message: "Login successful", token });
      } else {
        res.status(401).json({ message: "Invalid username or password" });
      }
    } else {
      res.status(404).json({ message: "User is not registered" });
    }
  } catch (err) {
    console.error("Error occurred while logging in:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.employeeDataSave = async (req, res) => {
  try {
    const employee = await Employee.create(req.body);
    res.json(employee);
  } catch (error) {
    console.error("Error occurred while saving employee:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.employeeEdit = async (req, res) => {
  try {
    const { id } = req.params; 
    const { name, designation, location, salary } = req.body; 

    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      { name, designation, location, salary },
      { new: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.json(updatedEmployee);
  } catch (error) {
    console.error("Error while updating employee:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.employeeDelete = async (req, res) => {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
    if (!deletedEmployee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.error("Error while deleting employee:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.employeeDataPrefill = async (req, res) => {
  try {
    const employeeId = req.params.id;
    const employee = await Employee.findById(employeeId);

    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.json(employee);
  } catch (error) {
    console.error("Error while fetching employee by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
