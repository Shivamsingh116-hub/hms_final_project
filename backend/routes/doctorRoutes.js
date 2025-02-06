const express = require('express')
const { updateTreatment, getDoctorData, deleteTreatmentData, updateDcotorProfile, getAppointmentData, statusUpdate } = require('../controller/doctorData')
const router = express.Router()
router.put('/update_treatment_array/:username', updateTreatment)
router.get('/get_doctor_schema_data', getDoctorData)
router.put('/delete_treatment_data/:id', deleteTreatmentData)
router.put('/update_doctor_profile/:username', updateDcotorProfile)
router.get('/get_patient_appointment_for_doctor_section', getAppointmentData)
router.put('/update_appointment_status/:appointmentId', statusUpdate)
const doctorRouter = router
module.exports = doctorRouter