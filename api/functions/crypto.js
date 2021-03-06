const cryptojs = require("crypto-js");
const config = require('./../../config');

const encrytp = (data) => {
    return cryptojs.AES.encrypt(req.body.birthdate, config.secretKey).toString();
};
const decrypt = (data) => {
    const bytes = cryptojs.AES.decrypt(data, config.secretKey);
    return bytes.toString(cryptojs.enc.Utf8);
};
module.exports = { encrytp, decrypt };