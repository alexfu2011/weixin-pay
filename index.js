var request = require('request');
var extend = require('util')._extend;
var util = require('./util');

function WxPay() {
    if (!(this instanceof WxPay)) {
        return new WxPay(arguments[0]);
    }
    this.options = arguments[0];
    this.wxpayID = {
        appid: this.options.appid,
        mch_id: this.options.mch_id
    };
}

WxPay.prototype.createUnifiedOrder = function (opts, callback) {
    opts.nonce_str = opts.nonce_str || util.generateNonceString();
    extend(opts, this.wxpayID);
    opts.sign = util.sign(opts, this.options.partner_key);
    request({
        url: "https://api.mch.weixin.qq.com/pay/unifiedorder",
        method: 'POST',
        body: util.buildXML(opts)
    },
        function (err, response, body) {
            if (err) return;
            util.parseXML(body, callback);
        });
};

module.exports = WxPay;
