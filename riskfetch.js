console.log('bye covid-19');

var CryptoJS = require("crypto-js");
var SHA256 = require("crypto-js/sha256");
var urllib = require('urllib');


e = ((new Date).getTime() / 1e3).toFixed();
i = "23y0ufFl5YxIyGrI8hWRUZmKkvtSjLQA"
a = "123456789abcdefg"
s = "zdww"
signatureHeader = SHA256(e + i + a + e).toString(CryptoJS.enc.Hex).toUpperCase();

jsonbody = {
    appId: "NcApplication",
    paasHeader: s,
    timestampHeader: e,
    nonceHeader: a,
    signatureHeader: signatureHeader,
    key: '3C502C97ABDA40D0A60FBEE50FAAD1DA'
};

paasHeader = s;
timestampHeader = e;
nonceHeader = a;

url = 'http://103.66.32.242:8005/zwfwMovePortal/interface/interfaceJson'

realSignatureHeader = CryptoJS.SHA256(timestampHeader + "fTN2pfuisxTavbTuYVSsNJHetwq5bJvCQkjjtiLM2dCratiA" + timestampHeader).toString(CryptoJS.enc.Hex).toUpperCase();

headers = {
    'Connection': 'keep-alive',
    'Accept': 'application/json, text/javascript, */*; q=0.01',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.67 Safari/537.36',
    'Content-Type': 'application/json; charset=UTF-8',
    'Origin': 'http://bmfw.www.gov.cn',
    'Referer': 'http://bmfw.www.gov.cn/',
    'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',

    'x-wif-nonce': 'QkjjtiLM2dCratiA',
    'x-wif-signature': realSignatureHeader,
    'x-wif-timestamp': timestampHeader,
    'x-wif-paasid': 'smt-application',


}
urllib.request(url, {
    method: 'POST',
    dataType: 'json',
    headers: headers,
    keepHeaderCase: true,
    data: jsonbody
}, function (err, data, res) {
    if (data && data.code === 0) {
        //do anything with the data as u wish.

    }
    else {
        console.log('查询失败');
    }
}


);



