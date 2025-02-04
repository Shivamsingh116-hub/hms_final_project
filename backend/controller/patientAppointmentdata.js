const patientAppointmentModel = require("../database/patientAppointmentData")
const registrationModel = require("../database/userRegistrationData")

const addPatientAppointmentData = async (req, res) => {
    const { status, name, appointmentDate, username, doctorUsername, doctorName, contact, email, alternateContact, treatment, date, message } = req.body
    const contactExist = await patientAppointmentModel.find({ contact: contact })
    const doctorExist = await registrationModel.find({ username: doctorUsername })
    if (doctorExist) {
        try {
            const response = await patientAppointmentModel.create({ status: status, name: name, doctorName: doctorName, alternateContact: alternateContact, username: username, doctorUsername: doctorUsername, contact: contact, email: email, treatment: treatment, date: date, message: message, appointmentDate: appointmentDate })
            if (response) {
                res.json({ message: "Added successfully", is_add: true })
            }
        } catch (e) {
            res.json({ message: e.message })
        }
    }

}
const getPatientAppointmentData = async (req, res) => {
    const search_query = req.query
    const username = search_query.username
    // conosle.log(username)
    const patientAppointmentData = []
    try {
        const response = await patientAppointmentModel.find({ username: username })
        if (response) {
            response.map((data) => {
                patientAppointmentData.push(data)
            })
        }
        res.json({ patientAppointmentData: patientAppointmentData })
    } catch (e) {
        console.log(e.message)
        res.json({ message: e.message })
    }
}
const deleteAppointmentData = async (req, res) => {
    try {
        const deleteData = await patientAppointmentModel.findByIdAndDelete(req.params.id)
        if (deleteData) {
            res.json({ message: "Delete appointment" })
        } else {
            res.json({ message: "Appointment not found" })
        }
    } catch (e) {
        res.json({ message: e.message })
    }

}
module.exports = { addPatientAppointmentData, getPatientAppointmentData, deleteAppointmentData }