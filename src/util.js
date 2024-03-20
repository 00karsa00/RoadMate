const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = '123456789';

exports.encryptPassword = (password) => {
    return new Promise((resolve, reject) => {
        try {
            // Hashing a password
            bcrypt.hash(password, 10, (err, hash) => {
                if (err) throw err;
                console.log('Hashed Password:', hash);
                resolve(hash)
            });
        } catch (e) {
            console.log("Util error => ", e)
            reject(e)
        }
    })
}

exports.checkPassword = (password, checkPassword) => {
    return new Promise((resolve, reject) => {
        try {
            // Comparing the hashed password with the plain password
            console.log("test test ",password, checkPassword)
            bcrypt.compare(password, checkPassword, (err, result) => {
                if (err) throw err;
                console.log('Password Match:', result);
                resolve(result)
            });
        } catch (e) {
            console.log("Util error => ", e)
            reject(e)
        }
    })
}

exports.createAccessToken = (data) => {
    return new Promise((resolve, reject) => {
        try {
            const options = {
                expiresIn: '1h', // Token expiration time
            };
            const token = jwt.sign(data, secretKey, options);
            console.log('Generated JWT:', token);
            resolve(token)
        } catch (e) {
            console.log("Util error => ", e)
            reject(e)
        }
    })
}