const express=require("express")
const { addBillingData, getBillingData } = require("../controller/billingData")
const router=express.Router()
router.post("/add_billing_data",addBillingData)
router.get('/get_billing_data',getBillingData)
const pharmacistRoute=router
module.exports=pharmacistRoute

// finally