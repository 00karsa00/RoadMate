const express = require('express');
const router = express.Router();
const validation = require("./validation");
const controller = require('./controller');

router.post('/admin/register', validation.adminRegisterValidation, controller.adminRegister);

router.post('/admin/login',validation.adminLoginValidation, controller.adminLogin);

router.post('/admin/itemDetail', controller.getItemDetails);

router.post('/admin/createSalesBill', controller.createSalesBill);

router.post('/admin/addItemToBill', controller.addItemToBill);

router.post('/admin/removeItemOnBill', controller.removeItemOnBill);

router.post('/admin/updateSalesBill', controller.updateSalesBill);

router.post('/admin/getBillList', controller.getBillList);

router.post('/admin/getProduct', controller.getProduct);

router.post('/admin/billDetails', controller.billDetails);

router.post('/admin/updateBillItem', controller.updateBillItem);

router.post('/admin/addItem', controller.addItem);

router.post('/admin/getItemList', controller.getItemList);
 
module.exports = router;