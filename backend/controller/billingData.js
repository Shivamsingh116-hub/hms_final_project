const billing2Model = require("../database/billing2Model")

const addBillingData = async (req, res) => {
    const { username, billArr, name, totalBill, pharmacistShop } = req.body
    console.log(req.body)
    try {
        const billGenerate = await billing2Model.create({ name, username, billArr, totalBill, pharmacistShop })
        if (billGenerate) {
            res.json({ message: "Bill added successfully" })
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
module.exports = { addBillingData, getBillingData }