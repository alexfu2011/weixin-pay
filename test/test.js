var assert = require('assert');
var WxPay = require('..');

describe('weixin pay', () => {
	it('should return SUCCESS when the wxpay value is present', () => {
		var wxpay = WxPay({
			appid: 'wxxxxxxxxxxxxx',
			mch_id: 'xxxxxxxxx',
			partner_key: 'xxxxxxxxxxxxxxxxxxxxxxxxxxx'
		});
		wxpay.createUnifiedOrder({
			body: '扫码支付测试',
			out_trade_no: '20140703' + Math.random().toString().substr(2, 10),
			total_fee: 1,
			spbill_create_ip: '192.168.2.210',
			notify_url: 'http://wxpay_notify_url',
			trade_type: 'NATIVE',
			product_id: '1234567890'
		}, (err, res) => {
			if (err) return;
			assert.strictEqual(res.return_code, 'SUCCESS');
		});
	});
});
