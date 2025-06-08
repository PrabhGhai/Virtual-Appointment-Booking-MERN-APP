const router = require("express").Router();
const User = require("../models/user");
const Appointment = require("../models/appointment");
const authMiddleware = require("../middleware/AuthMiddleware");
const { v4: uuidv4 } = require("uuid");
router.get("/fetch-doctors", async (req, res) => {
  try {
    const doctors = await User.find({ role: "doctor" })
      .select("-password")
      .sort({ createdAt: -1 });
    res.status(200).json({ doctors });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch doctors" });
  }
});

router.get("/doctor-details/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const dr = await User.findById(id).select("-password");

    if (!dr) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    // Get pending appointments for this doctor
    const appointments = await Appointment.find({
      doctor: id,
      status: "Pending",
    }).select("date time"); // Only select date and time fields

    return res.status(200).json({
      message: "success",
      user: dr,
      appointments,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch doctor details" });
  }
});

router.post("/book-appointment", authMiddleware, async (req, res) => {
  try {
    const { doctorId, date, time } = req.body;
    const patientId = req.user.id;

    if (!doctorId || !patientId || !date || !time) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check if the doctor exists
    const doctor = await User.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found." });
    }

    // Check if the patient exists
    const patient = await User.findById(patientId);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found." });
    }
    if (!patient.patientReport) {
      return res.status(400).json({ message: "Please update the report." });
    }

    // Check if appointment already exists
    const existingAppointment = await Appointment.findOne({
      doctor: doctorId,
      date,
      time,
    });

    if (existingAppointment) {
      return res.status(400).json({
        message:
          "This time slot is already booked. Please choose another time.",
      });
    }

    // Generate a unique roomId for video calling
    const roomId = uuidv4(); // e.g., '23cfb5ae-4c14-4f52-9b4a-29e2e5a6f5a7'

    // Create a new appointment
    const newAppointment = new Appointment({
      doctor: doctorId,
      patient: patientId,
      date,
      time,
      roomId, // Save generated roomId
    });

    await newAppointment.save();

    res.status(201).json({
      message: "Appointment booked successfully!",
      appointment: newAppointment,
    });
  } catch (error) {
    console.error("Error booking appointment:", error);
    res.status(500).json({ message: "Something went wrong!" });
  }
});

router.put("/update-appointment-status/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res
        .status(404)
        .json({ success: false, message: "Appointment not found" });
    }
    appointment.status = status;
    await appointment.save();
    res.status(200).json({ success: true, message: "Status updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.get("/doctor-appointments", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    const appointments = await Appointment.find({ doctor: userId })
      .populate("patient")
      .lean();
    appointments.sort((a, b) => {
      const dateA = new Date(`${a.date} ${a.time}`);
      const dateB = new Date(`${b.date} ${b.time}`);
      return dateA - dateB;
    });

    res.status(200).json({ message: "success", appointments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch appointments" });
  }
});
module.exports = router;
