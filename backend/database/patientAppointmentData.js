const mongoose = require('mongoose')
const patientAppointmentDataSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    username: {
        type: String,
        required: true
    },
    doctorName: {
        type: String,
        required: true
    },
    doctorUsername: {
        type: String,
        required: true,
    }, contact: {
        type: String,
        required: true,
    }, alternateContact: {
        type: Number,
        required: true,
    }, email: {
        type: String
    }, treatment: {
        type: String,
        required: true
    }, message: {
        type: String
    }, date: {
        type: String
    },appointmentDate:{
        type:String
    },status:{
        type:String
    }
})
const patientAppointmentModel = mongoose.model("patientAppointmentData", patientAppointmentDataSchema)
module.exports = patientAppointmentModel