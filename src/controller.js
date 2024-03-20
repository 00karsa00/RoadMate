const repository = require("./repository");
const utils = require("./util");
const moment = require("moment")

exports.adminRegister = async (req, res, next) => {
    let response = {};
    try {
        let { email, username } = req.body;
        let userInfo = await repository.getAdmin({
            email, username
        });
        let message = "Request not fulfilled",
            error = true;
        if(userInfo.length) {
            let isEmail = userInfo.find(item => item.email == email.toLowerCase());
            let isUser = userInfo.find(item => item.username == username.toLowerCase());
            if(isEmail) message = "Email Already exist."; 
            if(isUser) message = "Username Already exist."; 
            if(isEmail && isUser) message = "Email and username Already exist."; 
            console.log("message => ", message, error,isEmail,isUser)
        }
        if(!userInfo.length) {
            error = false;
            message = "Admin Created Successfully.";
            const newPassword = await utils.encryptPassword(req.body.password);
            const register = await repository.createAdmin({
                email, username, 
                password: newPassword, 
            });
        }
        response.error = error;
        response.status = 200;
        response.message = message;
        res.send(response);
        return false;
    } catch (e) {
        console.log("adminRegister error => ", e);
        response.error = true;
        response.status = 400;
        response.message = "Server error.";
        res.send(response);
        return false;
    }
};

exports.adminLogin = async (req, res, next) => {
    let response = {};
    try {
        let { username, password } = req.body;
        const adminDetail = await repository.getLoginAdmin(username);
        console.log("adminDetail => ",adminDetail)
        if(!adminDetail.length) {
            response.error = true;
            response.status = 400;
            response.message = "Email or Username is not found.";
        }
        if(adminDetail.length) {
            const isPassword = await utils.checkPassword(password, adminDetail[0].password);
            if(isPassword) {
                const taken  = await utils.createAccessToken({
                    id: adminDetail.id,
                    username: adminDetail.username
                })
                response.error = false;
                response.status = 200;
                response.message = "Login Successfully.";
                response.token = taken;
            }
            if(!isPassword) {
                response.error = true;
                response.status = 400;
                response.message = "Password is wrong.";
            }
        }
        res.send(response);
        return false;
    } catch (e) {
        console.log("adminLogin error => ", e);
        response.error = true;
        response.status = 500;
        response.message = "Server error.";
        res.send(response);
        return false;
    }
};

exports.getItemDetails = async (req, res, next) => {
    let response = {};
    try {
        let { name } = req.body; 
        const ItemDetails = await repository.getItemDetails({
            name
        });
        if(!ItemDetails.length) {
            response.error = true;
            response.status = 400;
            response.message = "Item not found.";
        }
        if(ItemDetails.length) {
            response.error = false;
            response.status = 200;
            response.message = "Data fetch successfully.";
            response.data = ItemDetails[0];
        }
        console.log("ItemDetails => ",ItemDetails)
        res.send(response);
        return false;
    } catch (e) {
        console.log("controller error => ", e);
        response.error = true;
        response.status = 500;
        response.message = "Server error.";
        res.send(response);
        return false;
    }
};

exports.createSalesBill = async (req, res, next) => {
    let response = {};
    try {
        const getLastBill = await repository.getLastBill();
        console.log("getLastBill => ",getLastBill)
        let nextBillId = 'TR';
        let numbericId = 0;
        if(getLastBill.length) {
            let lastId = getLastBill[0].billNumber;
            numbericId= lastId.match(/\d+/)[0];
        }
        nextBillId = `${nextBillId}${++numbericId}`;
        console.log(`${nextBillId}`);
        let insertItemId =  await repository.createSalesBill({
            billNumber: nextBillId,
            billDate: moment().format('YYYY-MM-DD HH:mm:ss'),
            status: 'Pending'
        });
        console.log("insertItemId => ",insertItemId)
        response.error = false;
        response.status = 200;
        response.message = "Bill Number was successfully created.";
        response.billNo = nextBillId
        res.send(response);
        return false;
    } catch (e) {
        console.log("controller error => ", e);
        response.error = true;
        response.status = 400;
        response.message = "Server error.";
        if(e.error) {
            response.message = e.message;
        }
        res.send(response);
        return false;
    }
};

exports.addItemToBill = async (req, res, next) => {
    let response = {};
    try {
        let { batchCode, billNo } = req.body; 
        const getLastBill = await repository.getItemDetils({
            batchCode
        });
        if(!getLastBill.length) {
            response.error = true;
            response.status = 200;
            response.message = "Item was not found";
            res.send(response);
            return false;
        }
        let result = await repository.addBillItem({
            batchCode,
            billNo,
            code: getLastBill[0].code,
            itemName: getLastBill[0].name,
            qty: 1,
            unitPrice: getLastBill[0].price,
            mrp: getLastBill[0].price,
            taxValue: getLastBill[0].taxValue,
            gstInPrecent: getLastBill[0].gstPercent,
            gstInAmount: (getLastBill[0].gstPercent/100) * (getLastBill[0].price * 1),
            total: ((getLastBill[0].gstPercent/100) * (getLastBill[0].price * 1)) + getLastBill[0].taxValue + (getLastBill[0].price*1)
        });
        let billDetails = await repository.getBillDetails(billNo);
        let totalTaxableAmount = 0;
        let totalAmount = 0;
        let gstAmount = 0;
        let itemDetail = {};
        billDetails.map((item) => {
            totalTaxableAmount += item.unitPrice * item.qty;
            totalAmount += item.total;
            gstAmount += item.gstInAmount;
            if(item.id == result[0]) {
                itemDetail = item;
            }
        })
        totalTaxableAmount = totalTaxableAmount.toFixed(2)
        totalAmount = totalAmount.toFixed(2)
        gstAmount = gstAmount.toFixed(2)
        await repository.updateBillDetail({
            totalTxableAmt: totalTaxableAmount,
            discount: 0,
            gstAmount: gstAmount,
            amount: totalAmount,
            roundOff: 0,
            grandTotal: totalAmount
        }, {
            billNumber:billNo
        })
        console.log(" billDetails => ",billDetails)
        response.error = false;
        response.status = 200;
        response.message = "item was successfully added";
        response.data = {
            totalTaxableAmount,totalAmount,gstAmount,
            discount: 0,
            roundOff: 0,
            grandTotal: totalAmount,
            itemDetail
        }
        res.send(response);
        return false;
    } catch (e) {
        console.log("controller error => ", e);
        response.error = true;
        response.status = 400;
        response.message = "Server error.";
        if(e.error) {
            response.message = e.message;
        }
        res.send(response);
        return false;
    }
};

exports.removeItemOnBill = async (req, res, next) => {
    let response = {};
    try {
        let { itemId, billNo } = req.body;
        await repository.removeBillItem({
            id: itemId,
            billNo: billNo
        });
        let billDetails =await repository.getBillDetails(billNo);
        let totalTaxableAmount = 0;
        let totalAmount = 0;
        let gstAmount = 0;
        billDetails.map((item) => {
            totalTaxableAmount += item.unitPrice * item.qty;
            totalAmount += item.total;
            gstAmount += item.gstInAmount;
        })
        totalTaxableAmount = totalTaxableAmount.toFixed(2)
        totalAmount = totalAmount.toFixed(2)
        gstAmount = gstAmount.toFixed(2)
        await repository.updateBillDetail({
            totalTxableAmt: totalTaxableAmount,
            discount: 0,
            gstAmount: gstAmount,
            amount: totalAmount,
            roundOff: 0,
            grandTotal: totalAmount
        }, {
            billNumber:billNo
        })
        console.log(" billDetails => ",billDetails)
        response.error = false;
        response.status = 200;
        response.message = "item removed successfully";
        response.data = {
            totalTaxableAmount,totalAmount,gstAmount,
            discount: 0,
            roundOff: 0,
            grandTotal: totalAmount
        }
        res.send(response);
        return false;
    } catch (e) {
        console.log("controller error => ", e);
        response.error = true;
        response.status = 400;
        response.message = "Server error.";
        if(e.error) {
            response.message = e.message;
        }
        res.send(response);
        return false;
    }
};

exports.updateSalesBill = async (req, res, next) => {
    let response = {};
    try {
        let { customerName, ewayBillNumber, billDate, deliveryDate, phoneNumber, address, deliveryAddress, transactionMode, vehicleNumber, deliveryCharge, outStanding, status, paymentMode, isIgst, note, billNo  } = req.body;
        await repository.updateBillDetail({
            customerName, ewayBillNumber, billDate, deliveryDate, phoneNumber, address, deliveryAddress, transactionMode, vehicleNumber, deliveryCharge, outStanding, status, paymentMode, isIgst, note 
        },{
            billNumber:billNo
        })
        response.error = false;
        response.status = 200;
        response.message = "Bill Updated successfully.";
        res.send(response);
        return false;
    } catch (e) {
        console.log("controller error => ", e);
        response.error = true;
        response.status = 400;
        response.message = "Server error.";
        if(e.error) {
            response.message = e.message;
        }
        res.send(response);
        return false;
    }
};

exports.getBillList = async (req, res, next) => {
    let response = {};
    try {
        const getAllBill = await repository.getAllBill();
        response.error = false;
        response.status = 200;
        response.message = "Fetch Data successfully.";
        response.data = getAllBill
        res.send(response);
        return false;
    } catch (e) {
        console.log("controller error => ", e);
        response.error = true;
        response.status = 400;
        response.message = "Server error.";
        if(e.error) {
            response.message = e.message;
        }
        res.send(response);
        return false;
    }
};

exports.getProduct = async (req, res, next) => {
    let response = {};
    try {
        let { name } = req.body;
        const getAllBill = await repository.getProduct(name);
        if(!getAllBill.length) {
            response.error = true;
            response.status = 200;
            response.message = "Item was note found.";
            response.data = getAllBill
            res.send(response);
            return false;
        }
        response.error = false;
        response.status = 200;
        response.message = "Fetch Data successfully.";
        response.data = getAllBill
        res.send(response);
        return false;
    } catch (e) {
        console.log("controller error => ", e);
        response.error = true;
        response.status = 400;
        response.message = "Server error.";
        if(e.error) {
            response.message = e.message;
        }
        res.send(response);
        return false;
    }
};

exports.billDetails = async (req, res, next) => {
    let response = {};
    try {
        let { billNo } = req.body;
        let billDetails =await repository.getBillDetails(billNo);
        let saleDetails =await repository.getsaleDetails(billNo);
        if(!saleDetails.length) {
            response.error = true;
            response.status = 200;
            response.message = "Bill Details is not found";
            res.send(response);
            return
        }
        response.error = false;
        response.status = 200;
        response.message = "Fetch Data successfully.";
        response.data = {
            saleDetail: saleDetails[0],
            billDetails
        }
        res.send(response);
        return false;
    } catch (e) {
        console.log("controller error => ", e);
        response.error = true;
        response.status = 400;
        response.message = "Server error.";
        if(e.error) {
            response.message = e.message;
        }
        res.send(response);
        return false;
    }
}

exports.updateBillItem = async (req, res, next) => {
    let response = {};
    try {
        let { qty, staff, itemId, billNo  } = req.body;
        console.log(qty, staff, req.body)
        await repository.updateBillItem({
            qty, staff
        }, {
            id: itemId,
            billNo: billNo
        });
        let billDetails =await repository.getBillDetails(billNo);
        let totalTaxableAmount = 0;
        let totalAmount = 0;
        let gstAmount = 0;
        let itemDetail = {};
        billDetails.map((item) => {
            totalTaxableAmount += item.unitPrice * item.qty;
            totalAmount += item.total;
            gstAmount += item.gstInAmount;
            if(item.id == itemId) {
                itemDetail = item;
            }
        })
        totalTaxableAmount = totalTaxableAmount.toFixed(2)
        totalAmount = totalAmount.toFixed(2)
        gstAmount = gstAmount.toFixed(2)
        await repository.updateBillDetail({
            totalTxableAmt: totalTaxableAmount,
            discount: 0,
            gstAmount: gstAmount,
            amount: totalAmount,
            roundOff: 0,
            grandTotal: totalAmount
        }, {
            billNumber:billNo
        })
        console.log(" billDetails => ",billDetails)
        response.error = false;
        response.status = 200;
        response.message = "item successfully updated";
        response.data = {
            totalTaxableAmount,totalAmount,gstAmount,
            discount: 0,
            roundOff: 0,
            grandTotal: totalAmount,
            itemDetail
        }
        res.send(response);
        return false;
    } catch (e) {
        console.log("controller error => ", e);
        response.error = true;
        response.status = 400;
        response.message = "Server error.";
        if(e.error) {
            response.message = e.message;
        }
        res.send(response);
        return false;
    }
}

exports.addItem = async (req, res, next) => {
    let response = {};
    try {
        let { name, code, batchCode, price, taxValue, gstPercent  } = req.body;
        let itemInfo = await repository.getAddItemDetails({
            code, batchCode
        });
        let message = "Request not fulfilled",
            error = true;
        if(itemInfo.length) {
            let isCode = itemInfo.find(item => item.code == code.toLowerCase());
            let isBatchCode = itemInfo.find(item => item.batchCode == batchCode.toLowerCase());
            if(isCode) message = "Code Already exist."; 
            if(isBatchCode) message = "BatchCode Already exist."; 
            if(isBatchCode && isCode) message = "Code and BatchCode Already exist."; 
        }
        if(!itemInfo.length) {
            error = false;
            message = "Admin Created Successfully.";
            await repository.addItemList({
                name, code, batchCode, price, taxValue, gstPercent
            });
        }
        response.error = error;
        response.status = 200;
        response.message = message;
        res.send(response);
        return false;
    } catch (e) {
        console.log("controller error => ", e);
        response.error = true;
        response.status = 400;
        response.message = "Server error.";
        if(e.error) {
            response.message = e.message;
        }
        res.send(response);
        return false;
    }
}


exports.getItemList = async (req, res, next) => {
    let response = {};
    try {
       let itemInfo = await repository.getItemList();
        response.error = false;
        response.status = 200;
        response.message = "Fetch successfully";
        response.data = itemInfo
        res.send(response);
        return false;
    } catch (e) {
        console.log("controller error => ", e);
        response.error = true;
        response.status = 400;
        response.message = "Server error.";
        if(e.error) {
            response.message = e.message;
        }
        res.send(response);
        return false;
    }
}
