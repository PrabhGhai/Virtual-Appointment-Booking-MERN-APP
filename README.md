# 🏥 Virtual Appointment Booking App (MERN Stack + Context API)

A full-stack virtual healthcare appointment platform designed to connect **patients** with **doctors** through secure **virtual video calls**, powered by the **MERN stack**. The application includes role-based access for **Users**, **Patients**, **Doctors**, and **Admins**. It also features an AI-powered chatbot to help patients get answers to health-related questions before or after booking appointments.

---

## 🚀 Features

### 👤 User Roles
- **User**: General visitor, can register as a patient or apply to become a doctor.
- **Patient**:
  - Upload medical reports.
  - Book appointments with available doctors.
  - Ask health-related questions through an AI chatbot (OpenRouter.ai + OpenAI GPT-3.5-Turbo).
  - Join virtual calls with doctors via **Jitsi Meet (meet.jit.si)**.
  - Update personal profile and medical details.
- **Doctor**:
  - View all their booked appointments.
  - Accept appointments at scheduled times.
  - Join virtual video consultations with patients.
  - View uploaded reports by patients.
- **Admin**:
  - Review applications submitted by users who want to become doctors.
  - Approve or reject doctor applications.
  - Manage user and doctor records.

---

## 🤖 AI Chatbot
- Integrated AI health assistant using:
  - **OpenRouter.ai** API
  - **Model**: `gpt-3.5-turbo`
- Patients can ask general health-related questions for guidance before connecting to a doctor.

---

## 📹 Virtual Video Consultation
- Secure and real-time virtual appointments powered by:
  - **Jitsi Meet** (`meet.jit.si`)
- Allows direct interaction between doctor and patient.

---

## 🧰 Tech Stack

### Frontend
- **React.js**
- **Context API** (for global state management)
- **Axios**, **React Router DOM**, etc.

### Backend
- **Node.js**
- **Express.js**

### Database
- **MongoDB** (NoSQL database for storing user, appointments, and reports)

### External Integrations
- **AI Chatbot**: `OpenRouter.ai` + `OpenAI GPT-3.5-Turbo`
- **Video Calling**: `meet.jit.si`

---


