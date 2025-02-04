const express = require("express")
const { userRegistration, verifyUser, userProtected } = require("../controller/userLogin")
const authenticationToken = require("../middlwares/authMiddleware")
const get_doctor_data = require("../controller/getDoctorData")
const { addPatientAppointmentData, getPatientAppointmentData, deleteAppointmentData } = require("../controller/patientAppointmentdata")
const router = express.Router()
router.post("/registration_data", userRegistration)
router.post("/signin_data", verifyUser)
router.get("/protected",authenticationToken,userProtected)
router.get('/get_doctor_data',get_doctor_data)
router.post('/add_patient_appointment',addPatientAppointmentData)
router.get('/get_patient_appointment_data',getPatientAppointmentData)
router.delete('/delete_appointment_data/:id',deleteAppointmentData)
const userRouter=router
module.exports=userRouter