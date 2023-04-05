const express = require("express");
const router = express.Router();
const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "sarthakIsTheB3$t";

//Route:1 : Create a User using : Post "api/auth/createUser" No login req
router.post(
  "/createUser",
  [
    // Validations for storage of username,email and password
    body(
      "name",
      "Please Enter a Name containing more than 3 characters"
    ).isLength({ min: 3 }),
    body("email", "Please Enter a valid email").isEmail(),
    body("password", "Password should atleast contain 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    // Checking the errors for validation
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    // Check wheather the user with the email exists already
    try {
      let user = await Doctor.findOne({ email: req.body.email });
      let patientUser = await Patient.findOne({ email: req.body.email });
      if (user || patientUser) {
        return res
          .status(400)
          .json({
            success,
            error: "sorry a user with this email already exists",
          });
      }
      let new_user = await Doctor.findOne({ name: req.body.phone });
      let new_PatientUser = await Patient.findOne({ name: req.body.phone });
      if (new_user || new_PatientUser) {
        return res
          .status(400)
          .json({
            success,
            error: "sorry a user with this Phone NUmber already exists",
          });
      }
      // Creating New User
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      if (req.body.role === "Patient") {
        patientUser = await Patient.create({
          name: req.body.name,
          email: req.body.email,
          password: secPass,
          role: req.body.role,
          phone: req.body.phone,
          state: req.body.state,
          dob:req.body.dob,

          
        });
        const data = {
            patientUser: {
              id: patientUser.id,
            },
          };
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authToken });
      }

      if (req.body.role === "Doctor") {
        user = await Doctor.create({
          name: req.body.name,
          email: req.body.email,
          password: secPass,
          role: req.body.role,
          phone: req.body.phone,
          state: req.body.state,
          dob:req.body.dob,
          specialization:req.body.specialization,
          working:req.body.working
        });
        const data = user.id;

        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authToken });
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);
module.exports = router;
