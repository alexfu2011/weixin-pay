var xml2js = require('xml2js');
var MD5 = require('MD5');

exports.buildXML = function (json) {
	var builder = new xml2js.Builder();
	return builder.buildObject(json);
};

exports.parseXML = function (xml, fn) {
	var parser = new xml2js.Parser({ trim: true, explicitArray: false, explicitRoot: false });
	parser.parseString(xml, fn || function (err, result) { });
};

exports.generateNonceString = function (length) {
	var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var maxPos = chars.length;
	var noceStr = "";
	for (var i = 0; i < (length || 32); i++) {
		noceStr += chars.charAt(Math.floor(Math.random() * maxPos));
	}
	return noceStr;
};

var createQueryString = function (options) {
	return Object.keys(options).filter(function (key) {
		return options[key] !== undefined && options[key] !== '' && ['pfx', 'apiKey', 'sign', 'key'].indexOf(key) < 0;
	}).sort().map(function (key) {
		return key + '=' + options[key];
	}).join("&");
};

exports.sign = function (object, key) {
	var querystring = createQueryString(object);
	if (key) querystring += "&key=" + key;

	return MD5(querystring).toUpperCase();
};
