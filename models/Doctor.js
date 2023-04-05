const mongoose = require("mongoose");
const { Schema } = mongoose;
const DoctorSchema = new Schema({
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
    required: true,
    // unique: true,
  },
  appointments: {
    type: Array,
  },
  specialization: {
    type: String,
    required: true,
  },
  working: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "Doctor",
  },
  bio: {
    type: String,
    required: false,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});
const Doctor = mongoose.model("doctor", DoctorSchema);
module.exports = Doctor;
