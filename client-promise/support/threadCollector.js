/**
 * Created by Administrator on 2016/11/9.
 */
/// <reference path="../../include.d.ts" />

var rp = require('request-promise');
var Promise = require('bluebird');
var cheerio = require('cheerio');
var ew = require('node-xlsx');
var fs = require('fs');

var columns = [];
var sheet = {name: 'result', data: []};
sheet.data.push(columns);
var rows = sheet.data;

var timeout = 1500;

/** compose url by yourself */
var urls = [];
var results = [];
var containerId = 2143;
var offset = 50;

 for (var i = 0; i < 1001; i=i+offset) {
    (function (k) {
        urls.push("https://support.t-mobile.com/__services/v2/rest/content?filterGroupID=placeContent&token=MTQ3ODc1OTM4NzI4MXwyMjB8W0JANDAxZTIyNGY%3D%3D&itemViewID=detail&start=" + i + "&numResults=" + offset + "&containerType=14&containerID=" + containerId + "&filterID=contentstatus%5Bpublished%5D~objecttype~objecttype%5Bthread%5D&itemView=detail&userID=-1&sortKey=contentstatus%5Bpublished%5D~creationDateAsc&sortOrder=1");
    } (i));
}

/** function to print excel */
var printToExcel = function () {
    var buffer = ew.build([sheet]);
    fs.writeFileSync('temp.xlsx', buffer);
    console.log('Everything was done successfully');
}

Promise.all(Promise.map(urls, singleRequest, {concurrency: 2})).then(function() {
    fs.writeFileSync(containerId + '.json', JSON.stringify(results));
    console.log('Totally ' + results.length + ' items');
});
// var length = JSON.parse(fs.readFileSync('2003.json').toString()).length;
// console.log(length);
// Promise.each(urls, singleRequest).then(function() {
//     fs.writeFileSync(containerId + '.json', JSON.stringify(results));
// });


/** Single Req */
function singleRequest(url) {
    var har = {
        "method": "GET",
        "url": url,
        "httpVersion": "HTTP/1.1",
        "headers": [
            {
                "name": "Cookie",
                "value": "jive.login.ts=1478569889166; BIGipServerm1s5c1-3-pool=1325508618.20480.0000; _jsuid=15075952; AMCVS_1358406C534BC94D0A490D4D%40AdobeOrg=1; visid_incap_850966=SCutVCBFS0iW5iM7zyrrLLAvIVgAAAAAQUIPAAAAAACkshFKWsN6rSMVDa8oLbAr; ClrOSSID=1478569914219-7483; ClrSCD=1478569914219; incap_ses_238_850966=otM0ffGnIGGR3GWfMYxNA/JHIVgAAAAA/2MZISdz262pVKhYq21AAA==; JSESSIONID=96C8C86E50E526113120779FD4D836A3; incap_ses_240_850966=ULVNOSnaMlOQVZB5XadUAwyKIlgAAAAA3WtMmnx07nonCT8LiNHdcg==; AMCV_1358406C534BC94D0A490D4D%40AdobeOrg=-1176276602%7CMCMID%7C36745466132230346268114653448642374204%7CMCAID%7CNONE%7CMCAAMLH-1479174699%7C9%7CMCAAMB-1479263502%7Chmk_Lq6TPIBMW925SPhw3Q%7CMCOPTOUT-1478665902s%7CNONE; s_visbtwpur=3; X-JCAPI-Token=UuMuXW5y; _ga=GA1.3.1846236134.1478569895; mbox=PC#9aa2627608f8470bb58f8326c4ab504c.28_51#1541904357|session#50cf5a029444462997cccc35ec6c4aa6#1478661418; ClrSSID=1478569914219-7483; s_dfa=tmobusprod%2Ctmobustmocomprod; LPCKEY-62258097=52e84291-05bd-4788-ac0e-67d9336758e25-40665%7Cnull%7Cnull%7C40; LPVID=RiOTc0ZTNlOTRkNmNjODk2; LPSID-62258097=o2FbGTvtROOT1vJe1a3OFw.339cffa57093886abed7c3a2f44f8f3204d924db; gpv_v10=support%2Fcommunity%2Fplans-services%2Fcontent; s_cc=true; _medioCivicCookieControl=enabledAtBootLoad=true,currentlyConsented=true; _medioSdk=anon_id=925b1948-c0c2-465e-9470-60c3bc1fb53d,session_id=fac90357-cd93-44ee-8390-ff94752001ba,session_ttl=1478659607289; __CT_Data=gpv=35&apv_18_www15=35; WRUID=0; acs.t=%7B%22_ckX%22%3A1486345902035%2C%22rid%22%3A%22d464cf1-82902042-d0d8-b731-4cedc%22%2C%22cp%22%3A%7B%22url%22%3A%22https%3A%2F%2Fsupport.t-mobile.com%2Fcommunity%2Fphones-tablets-devices%2Fcontent%3FfilterID%3Dcontentstatus%255Bpublished%255D~objecttype~objecttype%255Bthread%255D%26sortKey%3Dcontentstatus%255Bpublished%255D~creationDateAsc%26sortOrder%3D1%26start%3D20%22%2C%22section_my_tmobile%22%3A%22N%22%2C%22section_www_tmobile%22%3A%22N%22%2C%22Upgrade%22%3A%22N%22%2C%22Why_TMO%22%3A%22N%22%2C%22Add_a_Line%22%3A%22N%22%2C%22PrePaid%22%3A%22N%22%2C%22PrePaid_Activation%22%3A%22N%22%2C%22Accessory_LP%22%3A%22N%22%2C%22Accessory_Pgs%22%3A%22N%22%2C%22SIM%22%3A%22N%22%2C%22IsPrePaidSubscriber%22%3A%22False%22%2C%22Hi_fi%22%3A%22%22%2C%22isEIP%22%3A%22N%22%2C%22Adobe_VID%22%3A%22N%22%2C%22MSISDN%22%3A%22N%22%2C%22Account_Type%22%3A%22N%22%2C%22Support_LoggedIn%22%3A%22N%22%2C%22OMTR_BEACON%22%3A%22https%3A%2F%2Fsmetrics.t-mobile.com%2Fb%2Fss%2Ftmobusprod%2Ctmobustmocomprod%2F10%2FJS-1.7.0%2Fs24849450437217%3FAQB%3D1%26mid%3D36745466132230346268114653448642374204%26AQE%3D1%22%2C%22code_version%22%3A%2219.0.35%22%2C%22env%22%3A%22prd%22%2C%22terms%22%3A%22%22%2C%22browser%22%3A%22Chrome%2054%22%2C%22os%22%3A%22Windows%22%2C%22flash%22%3A%2223.0%22%2C%22hosted%22%3A%22true%22%2C%22referrer%22%3A%22%22%2C%22site%22%3A%22t-mobile.com%22%2C%22trigger_version%22%3A%2219.0.37HF1%22%2C%22pv%22%3A%225%22%2C%22locale%22%3A%22en%22%2C%22cxreplayaws%22%3A%22true%22%2C%22dn%22%3A%22tmobile%22%7D%2C%22pl%22%3A1%2C%22pv%22%3A5%2C%22def%22%3A2%2C%22browse-supportpv%22%3A5%2C%22rc%22%3A%22true%22%2C%22grft%22%3A1478659558197%2C%22mid%22%3A%22d464cf1-82903837-1c1f-5fbd-eee4d%22%2C%22rt%22%3Afalse%2C%22cncl%22%3Afalse%2C%22rpid%22%3A%22d464cf1-82470660-3da4-c2e6-4b149%22%2C%22dn%22%3A%22tmobile%22%2C%22i%22%3A%22a%22%2C%22rw%22%3A1486347054915%7D; jive.security.context=WKJKosAaA0UCBcUH8itYef//////////BbGCSfhW6JHQdM9ylC5hFQ6rWCLVDa0jXao9/gNrHIks/J4bFkoVGelHQJXV5pNc5dZon7KRrIqZqQP5; s_isvisst=1; s_visit=1; s_sq=tmobusprod%252Ctmobustmocomprod%3D%2526c.%2526a.%2526activitymap.%2526page%253Dsupport%25252Fcommunity%25252Fphones-tablets-devices%25252Fcontent%2526link%253D3%2526region%253Dj-browse-filters%2526pageIDType%253D1%2526.activitymap%2526.a%2526.c; _gali=j-browse-filters; _eventqueue=%7B%22heatmap%22%3A%5B%7B%22type%22%3A%22heatmap%22%2C%22href%22%3A%22%2Fcommunity%2Fphones-tablets-devices%2Fcontent%3FfilterID%3Dcontentstatus%255Bpublished%255D~objecttype~objecttype%255Bthread%255D%26sortKey%3Dcontentstatus%255Bpublished%255D~creationDateAsc%26sortOrder%3D1%26start%3D20%22%2C%22x%22%3A1076%2C%22y%22%3A413%2C%22w%22%3A1366%7D%5D%2C%22events%22%3A%5B%5D%7D"
            },
            {
                "name": "X-NewRelic-ID",
                "value": "UgAHU1RADQoAU1JbAA=="
            },
            {
                "name": "Accept-Encoding",
                "value": "gzip, deflate, sdch, br"
            },
            {
                "name": "Host",
                "value": "support.t-mobile.com"
            },
            {
                "name": "Accept-Language",
                "value": "en-US,en;q=0.8"
            },
            {
                "name": "User-Agent",
                "value": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.71 Safari/537.36"
            },
            {
                "name": "Accept",
                "value": "application/json, text/javascript, */*; q=0.01"
            },
            {
                "name": "Referer",
                "value": "https://support.t-mobile.com/community/phones-tablets-devices/content?filterID=contentstatus%5Bpublished%5D~objecttype~objecttype%5Bthread%5D&sortKey=contentstatus%5Bpublished%5D~creationDateAsc&sortOrder=1&start=40"
            },
            {
                "name": "X-J-Token",
                "value": "no-user"
            },
            {
                "name": "X-Requested-With",
                "value": "XMLHttpRequest"
            },
            {
                "name": "Connection",
                "value": "keep-alive"
            }
        ],
        "cookies": [
            {
                "name": "jive.login.ts",
                "value": "1478569889166",
                "expires": null,
                "httpOnly": false,
                "secure": false
            },
            {
                "name": "BIGipServerm1s5c1-3-pool",
                "value": "1325508618.20480.0000",
                "expires": null,
                "httpOnly": false,
                "secure": false
            },
            {
                "name": "_jsuid",
                "value": "15075952",
                "expires": null,
                "httpOnly": false,
                "secure": false
            },
            {
                "name": "AMCVS_1358406C534BC94D0A490D4D%40AdobeOrg",
                "value": "1",
                "expires": null,
                "httpOnly": false,
                "secure": false
            },
            {
                "name": "visid_incap_850966",
                "value": "SCutVCBFS0iW5iM7zyrrLLAvIVgAAAAAQUIPAAAAAACkshFKWsN6rSMVDa8oLbAr",
                "expires": null,
                "httpOnly": false,
                "secure": false
            },
            {
                "name": "ClrOSSID",
                "value": "1478569914219-7483",
                "expires": null,
                "httpOnly": false,
                "secure": false
            },
            {
                "name": "ClrSCD",
                "value": "1478569914219",
                "expires": null,
                "httpOnly": false,
                "secure": false
            },
            {
                "name": "incap_ses_238_850966",
                "value": "otM0ffGnIGGR3GWfMYxNA/JHIVgAAAAA/2MZISdz262pVKhYq21AAA==",
                "expires": null,
                "httpOnly": false,
                "secure": false
            },
            {
                "name": "JSESSIONID",
                "value": "96C8C86E50E526113120779FD4D836A3",
                "expires": null,
                "httpOnly": false,
                "secure": false
            },
            {
                "name": "incap_ses_240_850966",
                "value": "ULVNOSnaMlOQVZB5XadUAwyKIlgAAAAA3WtMmnx07nonCT8LiNHdcg==",
                "expires": null,
                "httpOnly": false,
                "secure": false
            },
            {
                "name": "AMCV_1358406C534BC94D0A490D4D%40AdobeOrg",
                "value": "-1176276602%7CMCMID%7C36745466132230346268114653448642374204%7CMCAID%7CNONE%7CMCAAMLH-1479174699%7C9%7CMCAAMB-1479263502%7Chmk_Lq6TPIBMW925SPhw3Q%7CMCOPTOUT-1478665902s%7CNONE",
                "expires": null,
                "httpOnly": false,
                "secure": false
            },
            {
                "name": "s_visbtwpur",
                "value": "3",
                "expires": null,
                "httpOnly": false,
                "secure": false
            },
            {
                "name": "X-JCAPI-Token",
                "value": "UuMuXW5y",
                "expires": null,
                "httpOnly": false,
                "secure": false
            },
            {
                "name": "_ga",
                "value": "GA1.3.1846236134.1478569895",
                "expires": null,
                "httpOnly": false,
                "secure": false
            },
            {
                "name": "mbox",
                "value": "PC#9aa2627608f8470bb58f8326c4ab504c.28_51#1541904357|session#50cf5a029444462997cccc35ec6c4aa6#1478661418",
                "expires": null,
                "httpOnly": false,
                "secure": false
            },
            {
                "name": "ClrSSID",
                "value": "1478569914219-7483",
                "expires": null,
                "httpOnly": false,
                "secure": false
            },
            {
                "name": "s_dfa",
                "value": "tmobusprod%2Ctmobustmocomprod",
                "expires": null,
                "httpOnly": false,
                "secure": false
            },
            {
                "name": "LPCKEY-62258097",
                "value": "52e84291-05bd-4788-ac0e-67d9336758e25-40665%7Cnull%7Cnull%7C40",
                "expires": null,
                "httpOnly": false,
                "secure": false
            },
            {
                "name": "LPVID",
                "value": "RiOTc0ZTNlOTRkNmNjODk2",
                "expires": null,
                "httpOnly": false,
                "secure": false
            },
            {
                "name": "LPSID-62258097",
                "value": "o2FbGTvtROOT1vJe1a3OFw.339cffa57093886abed7c3a2f44f8f3204d924db",
                "expires": null,
                "httpOnly": false,
                "secure": false
            },
            {
                "name": "gpv_v10",
                "value": "support%2Fcommunity%2Fplans-services%2Fcontent",
                "expires": null,
                "httpOnly": false,
                "secure": false
            },
            {
                "name": "s_cc",
                "value": "true",
                "expires": null,
                "httpOnly": false,
                "secure": false
            },
            {
                "name": "_medioCivicCookieControl",
                "value": "enabledAtBootLoad=true,currentlyConsented=true",
                "expires": null,
                "httpOnly": false,
                "secure": false
            },
            {
                "name": "_medioSdk",
                "value": "anon_id=925b1948-c0c2-465e-9470-60c3bc1fb53d,session_id=fac90357-cd93-44ee-8390-ff94752001ba,session_ttl=1478659607289",
                "expires": null,
                "httpOnly": false,
                "secure": false
            },
            {
                "name": "__CT_Data",
                "value": "gpv=35&apv_18_www15=35",
                "expires": null,
                "httpOnly": false,
                "secure": false
            },
            {
                "name": "WRUID",
                "value": "0",
                "expires": null,
                "httpOnly": false,
                "secure": false
            },
            {
                "name": "acs.t",
                "value": "%7B%22_ckX%22%3A1486345902035%2C%22rid%22%3A%22d464cf1-82902042-d0d8-b731-4cedc%22%2C%22cp%22%3A%7B%22url%22%3A%22https%3A%2F%2Fsupport.t-mobile.com%2Fcommunity%2Fphones-tablets-devices%2Fcontent%3FfilterID%3Dcontentstatus%255Bpublished%255D~objecttype~objecttype%255Bthread%255D%26sortKey%3Dcontentstatus%255Bpublished%255D~creationDateAsc%26sortOrder%3D1%26start%3D20%22%2C%22section_my_tmobile%22%3A%22N%22%2C%22section_www_tmobile%22%3A%22N%22%2C%22Upgrade%22%3A%22N%22%2C%22Why_TMO%22%3A%22N%22%2C%22Add_a_Line%22%3A%22N%22%2C%22PrePaid%22%3A%22N%22%2C%22PrePaid_Activation%22%3A%22N%22%2C%22Accessory_LP%22%3A%22N%22%2C%22Accessory_Pgs%22%3A%22N%22%2C%22SIM%22%3A%22N%22%2C%22IsPrePaidSubscriber%22%3A%22False%22%2C%22Hi_fi%22%3A%22%22%2C%22isEIP%22%3A%22N%22%2C%22Adobe_VID%22%3A%22N%22%2C%22MSISDN%22%3A%22N%22%2C%22Account_Type%22%3A%22N%22%2C%22Support_LoggedIn%22%3A%22N%22%2C%22OMTR_BEACON%22%3A%22https%3A%2F%2Fsmetrics.t-mobile.com%2Fb%2Fss%2Ftmobusprod%2Ctmobustmocomprod%2F10%2FJS-1.7.0%2Fs24849450437217%3FAQB%3D1%26mid%3D36745466132230346268114653448642374204%26AQE%3D1%22%2C%22code_version%22%3A%2219.0.35%22%2C%22env%22%3A%22prd%22%2C%22terms%22%3A%22%22%2C%22browser%22%3A%22Chrome%2054%22%2C%22os%22%3A%22Windows%22%2C%22flash%22%3A%2223.0%22%2C%22hosted%22%3A%22true%22%2C%22referrer%22%3A%22%22%2C%22site%22%3A%22t-mobile.com%22%2C%22trigger_version%22%3A%2219.0.37HF1%22%2C%22pv%22%3A%225%22%2C%22locale%22%3A%22en%22%2C%22cxreplayaws%22%3A%22true%22%2C%22dn%22%3A%22tmobile%22%7D%2C%22pl%22%3A1%2C%22pv%22%3A5%2C%22def%22%3A2%2C%22browse-supportpv%22%3A5%2C%22rc%22%3A%22true%22%2C%22grft%22%3A1478659558197%2C%22mid%22%3A%22d464cf1-82903837-1c1f-5fbd-eee4d%22%2C%22rt%22%3Afalse%2C%22cncl%22%3Afalse%2C%22rpid%22%3A%22d464cf1-82470660-3da4-c2e6-4b149%22%2C%22dn%22%3A%22tmobile%22%2C%22i%22%3A%22a%22%2C%22rw%22%3A1486347054915%7D",
                "expires": null,
                "httpOnly": false,
                "secure": false
            },
            {
                "name": "jive.security.context",
                "value": "WKJKosAaA0UCBcUH8itYef//////////BbGCSfhW6JHQdM9ylC5hFQ6rWCLVDa0jXao9/gNrHIks/J4bFkoVGelHQJXV5pNc5dZon7KRrIqZqQP5",
                "expires": null,
                "httpOnly": false,
                "secure": false
            },
            {
                "name": "s_isvisst",
                "value": "1",
                "expires": null,
                "httpOnly": false,
                "secure": false
            },
            {
                "name": "s_visit",
                "value": "1",
                "expires": null,
                "httpOnly": false,
                "secure": false
            },
            {
                "name": "s_sq",
                "value": "tmobusprod%252Ctmobustmocomprod%3D%2526c.%2526a.%2526activitymap.%2526page%253Dsupport%25252Fcommunity%25252Fphones-tablets-devices%25252Fcontent%2526link%253D3%2526region%253Dj-browse-filters%2526pageIDType%253D1%2526.activitymap%2526.a%2526.c",
                "expires": null,
                "httpOnly": false,
                "secure": false
            },
            {
                "name": "_gali",
                "value": "j-browse-filters",
                "expires": null,
                "httpOnly": false,
                "secure": false
            },
            {
                "name": "_eventqueue",
                "value": "%7B%22heatmap%22%3A%5B%7B%22type%22%3A%22heatmap%22%2C%22href%22%3A%22%2Fcommunity%2Fphones-tablets-devices%2Fcontent%3FfilterID%3Dcontentstatus%255Bpublished%255D~objecttype~objecttype%255Bthread%255D%26sortKey%3Dcontentstatus%255Bpublished%255D~creationDateAsc%26sortOrder%3D1%26start%3D20%22%2C%22x%22%3A1076%2C%22y%22%3A413%2C%22w%22%3A1366%7D%5D%2C%22events%22%3A%5B%5D%7D",
                "expires": null,
                "httpOnly": false,
                "secure": false
            }
        ]
    }
    var options = {
        har : har,
        proxy: 'http://test2.qypac.net:54167',
        gzip : true
        // proxy : 'http://43.241.225.182:20225'
    };
    return rp(options)
        .then(function (body) {
            var bodyStr = body.toString();
            bodyStr = bodyStr.replace("throw 'allowIllegalResourceCall is false.';", "");
            var bodyJson = JSON.parse(bodyStr);
            var items = bodyJson.items;
            console.log('Here ' + items.length + ' items fetched');
            items.forEach(function(item, index, array) {
                results.push(item);
            });
            return new Promise(function (res, rej) {
                setTimeout(function () {
                    res(url);
                }, timeout);
            });

        }).then(function (url) {
            console.log(url + ' was done');
        }).catch(function (err) {
            //handle errors
            console.log(err.message);
        });
}

