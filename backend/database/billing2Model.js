const mongoose = require('mongoose')
const billing2Schema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        username: {
            type: String,
        },
        billArr: {
            type: Array,
            default: []
        }
        , totalBill: {
            type: Number,
        },
        pharmacistShop: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        updatedAt: {
            type: Date,
            default: Date.now
        }

    }, {
    timestamps: true
}
)
const billing2Model = mongoose.model("billing2Data", billing2Schema)
module.exports = billing2Model