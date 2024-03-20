const express = require('express');
const router = express.Router();

const checkSession = (req, res, next) => {
    if(req.session && req.session.authorization) {
        return next();
    }
    res.redirect('/login');
}


router.get('/login',(req, res) => {
    if(req.session && req.session.authorization) {
        return res.redirect('/');
    }
    res.render('login',{page: 'login'});
});

router.get('/register', (req, res) => {
    res.render('register',{page: 'register'});
});

router.get('/',checkSession, (req, res) => {
    res.render('dashbord',{page: 'dashboard'});
});


router.get('/addBill',checkSession, (req, res) => {
    res.render('addNewBill',{page: 'dashboard'});
});

router.post('/setSession', (req, res) => {
    req.session.authorization = req.body.authorization
    res.json({
        error: false
    })
    return;
});


router.get('/updatebill/:billNo',checkSession, (req, res) => {
    let response = {
        page: 'billing',
        billNo: req.params.billNo
    }
    res.render('updateBill', response);
});


router.get('/addItem',checkSession, (req, res) => {
    res.render('additem',{page: 'dashboard'});
});

router.get('/itemList',checkSession, (req, res) => {
    res.render('itemList',{page: 'dashboard'});
});




module.exports = router;