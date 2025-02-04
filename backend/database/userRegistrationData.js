const mongoose = require('mongoose')
const registrationSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    username: {
        type: String,
        required: true,
        unique: true
    }, password: {
        type: String,
        required: true
    }, contact: {
        type: Number,
        required: true,
        unique: true
    }, email: {
        type: String
    }, role: {
        type: String,
        required: true
    },treatment:{
        type:[String],
        required:function(){
            return this.role==='Doctor'
        },
        default:[]
    }
})
const registrationModel = mongoose.model("userRegistrationData", registrationSchema)
module.exports = registrationModel