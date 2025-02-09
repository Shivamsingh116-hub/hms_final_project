const billing2Model = require("../database/billing2Model")

const addBillingData = async (req, res) => {
    const { username, billArr, name, totalBill, pharmacistShop } = req.body
    console.log(req.body)
    try {
        const billGenerate = await billing2Model.create({ name, username, billArr, totalBill, pharmacistShop })
        if (billGenerate) {
            res.json({ message: "Bill added successfully", bill: billGenerate })
        }
    } catch (e) {
        res.json({ message: e.message })
    }

}
const getBillingData = async (req, res) => {
    const { username } = req.query
    try {
        const findBill = await billing2Model.find({ username: username })
        if (findBill) {
            res.json({ billingData: findBill })
        } else {
            res.json({ billingData: false })
        }
    } catch (e) {
        res.json({ message: e.message })
    }
}
const updateBillUsernameUser = async (req, res) => {
    const { billId } = req.params
    const { username } = req.body
    try {
        const findBill = await billing2Model.findById(billId)
        if (!findBill) {
            return res.json({ message: "Bill not found" })
        } else if (findBill.username) {
            return res.json({ message: "It is already added to another user" })
        }
        const addUsesrname = await billing2Model.findByIdAndUpdate({ _id: billId }, { username: username })
        if (addUsesrname) {
            return res.json({ message: "Bill added successfully",is_add:true })
        } else {
            return res.json({ message: "Bill not added" })
        }
    } catch (e) {
        return res.json({ message: e.message })
    }
}
module.exports = { addBillingData, getBillingData, updateBillUsernameUser }