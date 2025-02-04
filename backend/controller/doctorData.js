const patientAppointmentModel = require("../database/patientAppointmentData")
const registrationModel = require("../database/userRegistrationData")
const bcrypt = require('bcrypt')
const updateTreatment = async (req, res) => {
    try {
        const checkTreatmentExist = await registrationModel.findOne({ username: req.params.username })
        if (checkTreatmentExist.treatment.includes(req.body.treatmentName)) {
            return res.json({ message: "Treatment already add.." })
        }
        const response = await registrationModel.findOneAndUpdate({ username: req.params.username }, { $push: { treatment: req.body.treatmentName } })
        if (response) {
            res.json({ message: "Treatment Added successfully" })
        } else {
            res.json({ message: "Not add" })
        }
    } catch (e) {
        res.json({ message: e.message })
    }
}
const getDoctorData = async (req, res) => {
    try {
        const doctor = await registrationModel.findOne({ username: req.query.username })
        res.json({ doctorData: doctor })
    } catch (e) {
        console.log(e)
        res.json({ message: e.message })
    }
}
const deleteTreatmentData = async (req, res) => {
    try {
        const deleteData = await registrationModel.findByIdAndUpdate({ _id: req.params.id }, { $pull: { treatment: req.body.treatmentName } })
        if (deleteData) {
            res.json({ message: "Treatment remove successfully" })
        } else {
            res.json({ message: "Treatment not found" })
        }
    } catch (e) {
        console.log(e)
        res.json({ message: e.message })
    }
}
const updateDcotorProfile = async (req, res) => {
    const { contact, email, matchPassword } = req.body
    const { username } = req.params
    const doctor = await registrationModel.findOne({ username: username })
    if (!doctor) {
        return res.json({ message: "Doctor no found" })
    }
    const verifyPassword = await bcrypt.compare(matchPassword, doctor.password)
    if (!verifyPassword) {
        return res.json({ message: "Password is invalid" })
    }
    try {
        const updateProfile = await registrationModel.findOneAndUpdate({ username: username }, { contact: contact, email: email })
        if (updateProfile) {
            res.json({ message: "Updated successfully" })
        } else {
            res.json({ message: "Not update" })
        }
    } catch (e) {
        res.json({ message: e.message })
    }
}
const getAppointmentData = async (req, res) => {
    const { username } = req.query
    try {
        const findAppointment = await patientAppointmentModel.find({ doctorUsername: username })
        if (findAppointment) {
            res.json(findAppointment)
        } else {
            res.json({ message: "No appointment data" })
        }
    } catch (e) {
        res.json({ message: e.message })
    }
}
const statusUpdate = async (req, res) => {
    try {
        const findAppointment = await patientAppointmentModel.findByIdAndUpdate({ _id: req.params.appointmentId }, { status: req.body.status })
        if (findAppointment.status === req.body.status) {
            res.json({ message: `Appointment already ${req.body.status}` })
        } else {
            res.json({ message: `${req.body.status} successfully` })
        }
    } catch (e) {
        res.json({ message: e.message })
    }
}
module.exports = { statusUpdate, updateTreatment, getAppointmentData, getDoctorData, deleteTreatmentData, updateDcotorProfile }