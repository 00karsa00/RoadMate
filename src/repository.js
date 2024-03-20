const db = require('../config/knex')
const users = 'users';
const billdetail = 'billdetails';
const itemDetail = 'itemDetailS';
const billingitemdetail = 'billingitemdetails';

exports.getAdmin = (item) => {
    return new Promise((resolve, reject) => {
        try {
            let { username, email } = item;
            db.select("*")
                .from(users)
                .where({username})
                .orWhere({email})
                .then((rows) => {
                    console.log("row => ", rows)
                    resolve(rows);
                })
                .catch((error) => {
                    reject(error);
                });
        } catch (e) {
            reject(e)
        }
    });
};

exports.getAddItemDetails = (item) => {
    return new Promise((resolve, reject) => {
        try {
            let { code, batchCode } = item;
            db.select("*")
                .from(itemDetail)
                .where({batchCode})
                .orWhere({code})
                .then((rows) => {
                    resolve(rows);
                })
                .catch((error) => {
                    reject(error);
                });
        } catch (e) {
            reject(e)
        }
    });
};

exports.createAdmin = (item) => {
    return new Promise((resolve, reject) => {
        try {
            db(users)
              .insert(item)
              .then((result) => {
                    resolve(result);
              })
              .catch((error) => {
                    reject(error);
              });
        } catch (e) {
            reject(e)
        }
    });
}


exports.addItemList = (item) => {
    return new Promise((resolve, reject) => {
        try {
            db(itemDetail)
              .insert(item)
              .then((result) => {
                    resolve(result);
              })
              .catch((error) => {
                    reject(error);
              });
        } catch (e) {
            reject(e)
        }
    });
}
exports.getItemList = () => {
    return new Promise((resolve, reject) => {
        try {
            db.select("*")
                .from(itemDetail) 
                .then((result) => {
                    resolve(result);
                })
                .catch((error) => {
                    reject(error);
                });
        } catch (e) {
            reject(e)
        }
    });
}
exports.getLoginAdmin = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            db.select("*")
                .from(users)
                .where({
                    email: email})
                .orWhere({
                    username: email
                })
                .then((rows) => {
                    console.log("row => ", rows)
                    resolve(rows);
                })
                .catch((error) => {
                    reject(error);
                });
        } catch (e) {
            reject(e)
        }
    })
}

exports.getItemDetails = (item) => {
    return new Promise(async (resolve, reject) => {
        try {
            db.select("*")
                .from(billdetail)
                .where(item)
                .then((rows) => {
                    console.log("row => ", rows)
                    resolve(rows);
                })
                .catch((error) => {
                    reject(error);
                });
        } catch (e) {
            console.log("Repository error => ", e)
            reject(e)
        }
    })
}

exports.getLastBill = () => {
    return new Promise(async (resolve, reject) => {
        try {
            db.select("*")
                .from(billdetail)
                .orderBy('id', 'desc') 
                .limit(1) 
                .then((row) => {
                    console.log("Last row => ", row);
                    resolve(row);
                })
                .catch((error) => {
                    reject(error);
                });
        } catch (e) {
            console.log("Repository error => ", e)
            reject(e)
        }
    })
}


exports.createSalesBill = (item) => {
    return new Promise((resolve, reject) => {
        try {
            db(billdetail)
              .insert(item)
              .then((result) => {
                    resolve(result);
              })
              .catch((error) => {
                    reject(error);
              });
        } catch (e) {
            reject(e)
        }
    });
}

exports.getItemDetils = (item) => {
    return new Promise((resolve, reject) => {
        try {
            db.select("*")
               .from(itemDetail) 
              .where(item)
              .then((result) => {
                    resolve(result);
              })
              .catch((error) => {
                    reject(error);
              });
        } catch (e) {
            reject(e)
        }
    });
}

exports.getBillDetails = (billNumber) => {
    return new Promise((resolve, reject) => {
        try {
            db.select("*")
              .from(billingitemdetail) 
              .where({
                billNo:billNumber
              })
              .then((result) => {
                    resolve(result);
              })
              .catch((error) => {
                    reject(error);
              });
        } catch (e) {
            reject(e)
        }
    });
}

exports.getsaleDetails = (billNumber) => {
    return new Promise((resolve, reject) => {
        try {
            db.select("*")
              .from(billdetail) 
              .where({
                billNumber:billNumber
              })
              .then((result) => {
                    resolve(result);
              })
              .catch((error) => {
                    reject(error);
              });
        } catch (e) {
            reject(e)
        }
    });
}

exports.addBillItem = (item) => {
    return new Promise((resolve, reject) => {
        try {
            console.log(item)
            db(billingitemdetail)
              .insert(item)
              .then((result) => {
                    resolve(result);
              })
              .catch((error) => {
                    reject(error);
              });
        } catch (e) {
            reject(e)
        }
    });
}


exports.updateBillDetail = (item, where) => {
    return new Promise((resolve, reject) => {
        try {
            db(billdetail)
                .where(where)
                .update(item)
                .then((result) => {
                    resolve(result);
                })
                .catch((error) => {
                    reject(error);
                });
        } catch (e) {
            reject(e)
        }
    });
}

exports.updateBillItem = (item, where) => {
    return new Promise((resolve, reject) => {
        try {
            db(billingitemdetail)
                .where(where)
                .update(item)
                .then((result) => {
                    resolve(result);
                })
                .catch((error) => {
                    reject(error);
                });
        } catch (e) {
            reject(e)
        }
    });
}

exports.removeBillItem = (item) => {
    return new Promise((resolve, reject) => {
        try {
            console.log("item => ", item)
            db(billingitemdetail)
                .where(item) // Specify the condition for deletion
                .del() // Delete the matched rows
                .then((result) => {
                    console.log("result => ",result)
                    resolve(result);
                })
                .catch((error) => {
                    reject(error);
                });
        } catch (e) {
            reject(e)
        }
    });
}

exports.getAllBill = () => {
    return new Promise((resolve, reject) => {
        try {
            db.select("*")
                .from(billdetail) 
                .then((result) => {
                    resolve(result);
                })
                .catch((error) => {
                    reject(error);
                });
        } catch (e) {
            reject(e)
        }
    });
}

exports.getProduct = (itemName) => {
    return new Promise((resolve, reject) => {
        try {
            db.select("*")
                .from(itemDetail) 
                .where('name','like', `%${itemName}%`)
                .then((result) => {
                    resolve(result);
                })
                .catch((error) => {
                    reject(error);
                });
        } catch (e) {
            reject(e)
        }
    });
}


