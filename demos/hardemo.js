var request = require('request');
var fs = require('fs');
var sTool = require('../toolkits/stringtool.js')

register();
setInterval(register, 1000 * 15);

function register() {
try {
var email = sTool.randomStr(8) + '@gmail.com';
var name = sTool.randomStr(4);

var har = {
    "url": "http://www.mysheriff.net/users/signup/",
    "method": "POST",
    "headers": [{
        "name": "Host",
        "value": "www.mysheriff.net"
				},
        {
            "name": "Connection",
            "value": "keep-alive"
        },
        {
            "name": "Content-Length",
            "value": "245"
        },
        {
            "name": "Cache-Control",
            "value": "max-age=0"
        },
        {
            "name": "Origin",
            "value": "http://www.mysheriff.net"
        },
        {
            "name": "Upgrade-Insecure-Requests",
            "value": "1"
        },
        {
            "name": "User-Agent",
            "value": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36"
        },
        {
            "name": "Content-Type",
            "value": "application/x-www-form-urlencoded"
        },
        {
            "name": "Accept",
            "value": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8"
        },
        {
            "name": "Referer",
            "value": "http://www.mysheriff.net/users/"
        },
        {
            "name": "Accept-Encoding",
            "value": "gzip, deflate"
        },
        {
            "name": "Accept-Language",
            "value": "zh-CN,zh;q=0.8"
        },
        {
            "name": "Cookie",
            "value": "SR=m04d6k1p6f3srvp4v03tlspu76; __atuvc=2%7C27; __atuvs=577cc00de7ad068e000; __utmt=1; tntcon=c0172ea66506f59c8c435eb66176fb67a4xn; __utma=110611609.1743308010.1467679327.1467771907.1467793336.4; __utmb=110611609.16.10.1467793336; __utmc=110611609; __utmz=110611609.1467679327.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none)"
        }],
    "postData": {
        "params": [{
            "name": "gender",
            "value": "Male"
        },
            {
                "name": "firstname",
                "value": name
            },
            {
                "name": "lastname",
                "value": name
            },
            {
                "name": "email_address",
                "value": email
            },
            {
                "name": "password",
                "value": "123456"
            },
            {
                "name": "cmbmonth",
                "value": "1"
            },
            {
                "name": "cmbday",
                "value": "3"
            },
            {
                "name": "cmbyear",
                "value": "1926"
            },
            {
                "name": "City",
                "value": "Naalehu,Hawaii"
            },
            {
                "name": "State",
                "value": "HI"
            },
            {
                "name": "County",
                "value": "Hawaii"
            },
            {
                "name": "OnlyCity",
                "value": "Naalehu"
            },
            {
                "name": "verif_box",
                "value": "8057"
            },
            {
                "name": "interested_in",
                "value": "2"
            },
            {
                "name": "redirectURL",
                "value": ""
            },
            {
                "name": "signUp",
                "value": "Sign Up"
            }],
        "mimeType": "application/x-www-form-urlencoded"
				},

}

request({
    method: 'POST',
    uri: 'http://www.mysheriff.net/users/signup/',
    har: har
});

fs.appendFileSync('emails.txt', email + '\r\n');
} catch(error) {
    console.log(error);
}
}