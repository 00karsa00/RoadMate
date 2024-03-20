const Joi = require('joi');

exports.adminRegisterValidation = (req, res, next) => {
    const schema = Joi.object({
        username: Joi.string().alphanum().min(3).max(10).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(5).max(15).required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.json({ 
            status: 400,
            error: true,
            message: error.details[0].message 
        });
    }
    next();
}

exports.adminLoginValidation = (req, res, next) => {
    const schema = Joi.object({
        username: Joi.string().alphanum().min(3).max(50).required(),
        password: Joi.string().min(5).max(15).required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.json({ 
            status: 400,
            error: true,
            message: error.details[0].message 
        });
    }
    next();
}

exports.itemDetailValidation = (req, res, next) => {
    const schema = Joi.object({
        itemName: Joi.string().required()
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.json({ 
            status: 400,
            error: true,
            message: error.details[0].message 
        });
    }
    next();
}


exports.createSalesBillValidation = (req, res, next) => {
    const schema = Joi.object({
        billNumber: Joi.string().alphanum().required(),
        billDate: Joi.string().required(),
        ewayBillNumber: Joi.string().alphanum().required(),
        deliveryDate: Joi.string().required(),
        customerName: Joi.string().required(),
        phoneNumber: Joi.number().required(),
        address: Joi.string().required(),
        isIgst: Joi.boolean().required(),
        deliveryAddress: Joi.string().required(),
        transactionMode: Joi.string().required(),
        note: Joi.string(),
        itemDetails: Joi.array().required(),
        vehicleNumber: Joi.string().required(),
        deliveryCharge: Joi.number().required(),
        totalTxableAmt: Joi.number().required(),
        outStanding: Joi.string().min(0),
        discount: Joi.number().required(),
        gstAmount: Joi.number().required(),
        paymentMode: Joi.string().required(),
        amount: Joi.number().required(),
        roundOff: Joi.string(),
        grandTotal: Joi.number().required(),
        status: Joi.string().required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.json({ 
            status: 400,
            error: true,
            message: error.details[0].message 
        });
    }
    next();
}