const mongoose = require("mongoose");
const { Schema } = mongoose;
const PatientSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: false,
  },
  state: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    unique:true
  },
  appointments: {
    type: Array,
  },

  role: {
    type: String,
    required: true,
    default: "Patient",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
const Patient = mongoose.model("patient", PatientSchema);
module.exports = Patient;
