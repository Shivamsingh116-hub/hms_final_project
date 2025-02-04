const registrationModel = require("../database/userRegistrationData")

const get_doctor_data = async (req, res) => {
    try {
        const response = await registrationModel.find()
        const doctorsData=[]
        response.map((doctor)=>{
            if (doctor.role === 'Doctor') {
                doctorsData.push(doctor)
            }
        })
        res.json({doctorsData:doctorsData})
    } catch (e) {
        res.json({message:e.message})
        console.log(e)
    }
}

module.exports = get_doctor_data