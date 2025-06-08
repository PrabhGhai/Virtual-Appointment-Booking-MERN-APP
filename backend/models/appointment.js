const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // assuming your doctor is stored in User model
    required: true,
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // assuming patient is also User
    required: true,
  },
  date: {
    type: String, // storing in 'YYYY-MM-DD' format
    required: true,
  },
  time: {
    type: String, // storing time like '09:00 AM'
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Confirmed", "Cancelled"],
    default: "Pending",
  },
  roomId: {
    type: String,
  },
});

module.exports = mongoose.model("Appointment", appointmentSchema);
