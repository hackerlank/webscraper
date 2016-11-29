/// <reference path="../../include.d.ts" />

var rp = require('request-promise');
var Promise = require('bluebird');
var cheerio = require('cheerio');
var ew = require('node-xlsx');
var fs = require('fs');

var columns = ['Location', 'Replies', 'Inquirer Name', 'Inquirer Status', 'Inquirer Time', 'Inquirer Post Title', 'Inquirer Post Status', 'Inquirer Post Content', 'Inquirer Post View'];
var sheet = { name: 'Discussion', data: [] };
sheet.data.push(columns);
var rows = sheet.data;

var timeout = 1500;
var proxy = '';
var userStatus = {};
// /** compose url by yourself */
// var inScope = [];

// var duplicates = [];

// var items = JSON.parse(fs.readFileSync('finalThreads.json').toString());
// var startStr = '2016-04-19T00:00:00.000+0000';
// var endStr = '2016-10-19T00:00:00.000+0000';
// var startDate = new Date(startStr);
// var endDate = new Date(endStr);

// items.forEach(function (item, index, array) {
//     var timeStr = item.created;
//     var createdDate = new Date(timeStr);

//     if ((createdDate.getTime() > startDate.getTime()) && (createdDate.getTime() < endDate.getTime())) {
//         if(duplicates.indexOf(item.objectURL) == -1) {
//             inScope.push(item);
//             duplicates.push(item.objectURL);
//         }
//     }
// });

var all = [];
var base = 'https://support.t-mobile.com/thread/'

// var sources = ['2003.json', '2009.json', '2010.json', '2241.json', '2397.json', '2143.json'];
var sources = [];
var folder = 'json/';
var files = fs.readdirSync(folder);
files.forEach(function (file, index, array) {
    sources.push(folder + file);
});

var total = 0;
// var start = 1397836800000;
// var end = 1413648000000;

// var start = 1429430400000;
// var end = 1445241600000;

var start = 1461024000000;
var end = 1476835200000;

sources.forEach(function (file, index, array) {
    var jsonArray = JSON.parse(fs.readFileSync(file).toString());
    fs.appendFileSync('count.txt', file + ' -> ' + jsonArray.length + '\r\n');
    total += jsonArray.length;
    jsonArray.forEach(function (item, index, array) {
        if ((item.creationDate > start) && (item.creationDate < end)) {
            // if (item.id == 68922)
            all.push(item);
        }
    });
});

console.log('Total ' + total);
console.log(all.length + ' items would be fetched');

// all = all.slice(0, 1);

/** function to print excel */
var printToExcel = function () {
    var buffer = ew.build([sheet]);
    fs.writeFileSync('support.xlsx', buffer);
    console.log('printed');
}

Promise.all(Promise.map(all, singleRequest, { concurrency: 3 })).then(printToExcel);


/** Single Req */
function singleRequest(item) {
    var url = base + item.id;
    var postDate = item.creationDate;
    var options = {
        method: 'GET',
        uri: url,
        gzip: true,
        timeout: 30000
    };
    return rp(options)
        .then(function (body) {
            var $ = cheerio.load(body);
            var location = $('#jive-breadcrumb').text().trim();
            var replies = $('.jive-thread-info strong').text();
            var inquirer = $('.js-original-header .j-post-author strong').text();
            var inquireStatus = '';
            // var time = $('.js-original-header .j-post-author').text().replace(inquirer, '').trim();
            var time = new Date(parseFloat(postDate));
            var title = $('.js-original-header h1 a').text();
            var status = '';
            var content = $('.j-original-message').text().trim();
            var viewCount = item.prop.viewCount;
            // var viewCount = '';
            var row = [];
            row.push(location);
            row.push(replies);
            row.push(inquirer);
            row.push(inquireStatus);
            row.push(time);
            row.push(title);
            row.push(status);
            row.push(content);
            row.push(viewCount);

            var commentJson = [];

            $('.reply').each(function (index, element) {
                var commenterId = $(this).find('.reply .j-post-author .jive-username-link').attr('data-userid');
                var commentAuthor = $(this).find('.reply .j-post-author .jive-username-link').text();
                var commenterStatus = '';
                var replyTo = $(this).find('.j-thread-replyto').text();
                var commentTime = $(this).find('.reply .j-post-author ').text().replace(commentAuthor, '').replace(replyTo, '').trim();
                var commentContent = $(this).find('.reply .jive-rendered-content').text().trim();

                var singleComment = {
                    id: commenterId,
                    author: commentAuthor,
                    time: commentTime,
                    status: commenterStatus,
                    content: commentContent
                }
                commentJson.push(singleComment);
            });

            /**  some extra information*/
            var posterId = $('.js-original-header .j-post-author a').attr('data-userid');
            var posterName = inquirer;
            var replyCount = parseInt(replies.match(/\d+/));

            var entity = {
                url: url,
                row: row,
                originalItem: item,
                posterId: posterId,
                commentJson: commentJson,
                replyCount: replyCount,
                posterName: posterName
            }

            return new Promise(function (res, rej) {
                setTimeout(function () {
                    res(entity);
                }, timeout);
            });

        }).then(function (entity) {
            /** process answer status*/
            var item = entity.originalItem;
            var har = {
                "method": "GET",
                "url": "https://support.t-mobile.com/__services/v2/rest/message/" + item.id + "/question",
                "httpVersion": "HTTP/1.1",
                "headers": [
                    {
                        "name": "Cookie",
                        "value": "jive.login.ts=1478569889166; BIGipServerm1s5c1-3-pool=1325508618.20480.0000; _jsuid=15075952; AMCVS_1358406C534BC94D0A490D4D%40AdobeOrg=1; visid_incap_850966=SCutVCBFS0iW5iM7zyrrLLAvIVgAAAAAQUIPAAAAAACkshFKWsN6rSMVDa8oLbAr; ClrOSSID=1478569914219-7483; ClrSCD=1478569914219; incap_ses_238_850966=otM0ffGnIGGR3GWfMYxNA/JHIVgAAAAA/2MZISdz262pVKhYq21AAA==; incap_ses_240_850966=BcnNPmNXLAZ6OJd5XadUA2+UIlgAAAAAV3vwHoM3NwLPxTZYgu/UEg==; JSESSIONID=81307B2AA7BEF04C127BB1F78C2ECE33; X-JCAPI-Token=p5OJKv2B; incap_ses_258_850966=tTkwQtrd6CUyQflI3JmUA7MoJFgAAAAARd1ywIXONWhfmNLtZJkhmA==; AMCV_1358406C534BC94D0A490D4D%40AdobeOrg=-1176276602%7CMCMID%7C36745466132230346268114653448642374204%7CMCAID%7CNONE%7CMCAAMLH-1479174699%7C9%7CMCAAMB-1479369547%7Chmk_Lq6TPIBMW925SPhw3Q%7CMCOPTOUT-1478771947s%7CNONE; s_visbtwpur=5; incap_ses_84_850966=EiEtbmYdA2C07IwZHG4qAUApJFgAAAAAlKn+Hw/Lx7maj8GuWOXb5g==; anonymous=false; _first_pageview=1; _gat=1; incap_ses_443_850966=5acSJH7nIUpMFPOratolBk8uJFgAAAAAISteTReDbgHaGj67r2PxCQ==; NITRO_SESSION_8669fb5ca184467cbc40c7e1d0cbc52d_-1=NXwxNDI4NzB8MTMxMzA1MzIzNzR8MTQ3ODkzODk2Mnw1MmEwMWNkZjNkMGU2OWZlNDc3NWUzZTE2YjAzNTNlYzQzZTA1Y2E1NzE3MjgyMWYwNjgxMzVkYTlkNTkxZWQxfDA=; _eventqueue=%7B%22heatmap%22%3A%5B%5D%2C%22events%22%3A%5B%5D%7D; s_sq=%5B%5BB%5D%5D; s_dfa=tmobusprod%2Ctmobustmocomprod; gpv_v10=support%2Fthread%2F85356; s_isvisst=1; s_visit=1; s_cc=true; LPCKEY-62258097=52e84291-05bd-4788-ac0e-67d9336758e25-40665%7Cnull%7Cnull%7C40; LPVID=RiOTc0ZTNlOTRkNmNjODk2; LPSID-62258097=N24oO8CmSSK4TMZWvyrYSg.339cffa57093886abed7c3a2f44f8f3204d924db; acs.t=%7B%22_ckX%22%3A1486345902035%2C%22rid%22%3A%22d464cf1-82902042-d0d8-b731-4cedc%22%2C%22cp%22%3A%7B%22url%22%3A%22https%3A%2F%2Fsupport.t-mobile.com%2Fthread%2F85356%22%2C%22section_my_tmobile%22%3A%22N%22%2C%22section_www_tmobile%22%3A%22N%22%2C%22Upgrade%22%3A%22N%22%2C%22Why_TMO%22%3A%22N%22%2C%22Add_a_Line%22%3A%22N%22%2C%22PrePaid%22%3A%22N%22%2C%22PrePaid_Activation%22%3A%22N%22%2C%22Accessory_LP%22%3A%22N%22%2C%22Accessory_Pgs%22%3A%22N%22%2C%22SIM%22%3A%22N%22%2C%22IsPrePaidSubscriber%22%3A%22False%22%2C%22Hi_fi%22%3A%22%22%2C%22isEIP%22%3A%22N%22%2C%22Adobe_VID%22%3A%22N%22%2C%22MSISDN%22%3A%22N%22%2C%22Account_Type%22%3A%22N%22%2C%22Support_LoggedIn%22%3A%22N%22%2C%22OMTR_BEACON%22%3A%22https%3A%2F%2Fsmetrics.t-mobile.com%2Fb%2Fss%2Ftmobusprod%2Ctmobustmocomprod%2F10%2FJS-1.7.0%2Fs26835724128918%3FAQB%3D1%26mid%3D36745466132230346268114653448642374204%26AQE%3D1%22%2C%22code_version%22%3A%2219.0.35%22%2C%22env%22%3A%22prd%22%2C%22terms%22%3A%22%22%2C%22browser%22%3A%22Chrome%2054%22%2C%22os%22%3A%22Windows%22%2C%22flash%22%3A%2223.0%22%2C%22hosted%22%3A%22true%22%2C%22referrer%22%3A%22%22%2C%22site%22%3A%22t-mobile.com%22%2C%22trigger_version%22%3A%2219.0.37HF1%22%2C%22pv%22%3A%225%22%2C%22locale%22%3A%22en%22%2C%22cxreplayaws%22%3A%22true%22%2C%22dn%22%3A%22tmobile%22%7D%2C%22pl%22%3A1%2C%22pv%22%3A5%2C%22def%22%3A2%2C%22browse-supportpv%22%3A5%2C%22rc%22%3A%22true%22%2C%22grft%22%3A1478766479469%2C%22mid%22%3A%22d464cf1-82903837-1c1f-5fbd-eee4d%22%2C%22rt%22%3Afalse%2C%22cncl%22%3Afalse%2C%22rpid%22%3A%22d464cf1-82798804-543b-a7bf-4212d%22%2C%22dn%22%3A%22tmobile%22%2C%22i%22%3A%22a%22%2C%22rw%22%3A1486347054915%7D; ClrCSTO=T; ClrSSID=1478569914219-7483; _medioCivicCookieControl=enabledAtBootLoad=true,currentlyConsented=true; _medioSdk=anon_id=925b1948-c0c2-465e-9470-60c3bc1fb53d,session_id=d7278e06-7ad8-4103-b580-9a1f44896ea3,session_ttl=1478766513828; __CT_Data=gpv=49&apv_18_www15=48; WRUID=0; mbox=PC#9aa2627608f8470bb58f8326c4ab504c.28_51#1542011301|session#2c58e2217ae94c1c85921b9ed3e95004#1478768361; _ga=GA1.3.1846236134.1478569895; jive.security.context=YK9QpG2lRo3lbYO+8+HDdP//////////gC2bNXSZT+lIN4xP1weEMoq64YsDD3U9RDzSrdMOMi5xflx0nSOu7suUfUtdt9yPfStNNfazLfVNIb5o"
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
                        "value": "https://support.t-mobile.com/thread/131448"
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
                        "name": "incap_ses_240_850966",
                        "value": "BcnNPmNXLAZ6OJd5XadUA2+UIlgAAAAAV3vwHoM3NwLPxTZYgu/UEg==",
                        "expires": null,
                        "httpOnly": false,
                        "secure": false
                    },
                    {
                        "name": "JSESSIONID",
                        "value": "81307B2AA7BEF04C127BB1F78C2ECE33",
                        "expires": null,
                        "httpOnly": false,
                        "secure": false
                    },
                    {
                        "name": "X-JCAPI-Token",
                        "value": "p5OJKv2B",
                        "expires": null,
                        "httpOnly": false,
                        "secure": false
                    },
                    {
                        "name": "incap_ses_258_850966",
                        "value": "tTkwQtrd6CUyQflI3JmUA7MoJFgAAAAARd1ywIXONWhfmNLtZJkhmA==",
                        "expires": null,
                        "httpOnly": false,
                        "secure": false
                    },
                    {
                        "name": "AMCV_1358406C534BC94D0A490D4D%40AdobeOrg",
                        "value": "-1176276602%7CMCMID%7C36745466132230346268114653448642374204%7CMCAID%7CNONE%7CMCAAMLH-1479174699%7C9%7CMCAAMB-1479369547%7Chmk_Lq6TPIBMW925SPhw3Q%7CMCOPTOUT-1478771947s%7CNONE",
                        "expires": null,
                        "httpOnly": false,
                        "secure": false
                    },
                    {
                        "name": "s_visbtwpur",
                        "value": "5",
                        "expires": null,
                        "httpOnly": false,
                        "secure": false
                    },
                    {
                        "name": "incap_ses_84_850966",
                        "value": "EiEtbmYdA2C07IwZHG4qAUApJFgAAAAAlKn+Hw/Lx7maj8GuWOXb5g==",
                        "expires": null,
                        "httpOnly": false,
                        "secure": false
                    },
                    {
                        "name": "anonymous",
                        "value": "false",
                        "expires": null,
                        "httpOnly": false,
                        "secure": false
                    },
                    {
                        "name": "_first_pageview",
                        "value": "1",
                        "expires": null,
                        "httpOnly": false,
                        "secure": false
                    },
                    {
                        "name": "_gat",
                        "value": "1",
                        "expires": null,
                        "httpOnly": false,
                        "secure": false
                    },
                    {
                        "name": "incap_ses_443_850966",
                        "value": "5acSJH7nIUpMFPOratolBk8uJFgAAAAAISteTReDbgHaGj67r2PxCQ==",
                        "expires": null,
                        "httpOnly": false,
                        "secure": false
                    },
                    {
                        "name": "NITRO_SESSION_8669fb5ca184467cbc40c7e1d0cbc52d_-1",
                        "value": "NXwxNDI4NzB8MTMxMzA1MzIzNzR8MTQ3ODkzODk2Mnw1MmEwMWNkZjNkMGU2OWZlNDc3NWUzZTE2YjAzNTNlYzQzZTA1Y2E1NzE3MjgyMWYwNjgxMzVkYTlkNTkxZWQxfDA=",
                        "expires": null,
                        "httpOnly": false,
                        "secure": false
                    },
                    {
                        "name": "_eventqueue",
                        "value": "%7B%22heatmap%22%3A%5B%5D%2C%22events%22%3A%5B%5D%7D",
                        "expires": null,
                        "httpOnly": false,
                        "secure": false
                    },
                    {
                        "name": "s_sq",
                        "value": "%5B%5BB%5D%5D",
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
                        "name": "gpv_v10",
                        "value": "support%2Fthread%2F85356",
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
                        "name": "s_cc",
                        "value": "true",
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
                        "value": "N24oO8CmSSK4TMZWvyrYSg.339cffa57093886abed7c3a2f44f8f3204d924db",
                        "expires": null,
                        "httpOnly": false,
                        "secure": false
                    },
                    {
                        "name": "acs.t",
                        "value": "%7B%22_ckX%22%3A1486345902035%2C%22rid%22%3A%22d464cf1-82902042-d0d8-b731-4cedc%22%2C%22cp%22%3A%7B%22url%22%3A%22https%3A%2F%2Fsupport.t-mobile.com%2Fthread%2F85356%22%2C%22section_my_tmobile%22%3A%22N%22%2C%22section_www_tmobile%22%3A%22N%22%2C%22Upgrade%22%3A%22N%22%2C%22Why_TMO%22%3A%22N%22%2C%22Add_a_Line%22%3A%22N%22%2C%22PrePaid%22%3A%22N%22%2C%22PrePaid_Activation%22%3A%22N%22%2C%22Accessory_LP%22%3A%22N%22%2C%22Accessory_Pgs%22%3A%22N%22%2C%22SIM%22%3A%22N%22%2C%22IsPrePaidSubscriber%22%3A%22False%22%2C%22Hi_fi%22%3A%22%22%2C%22isEIP%22%3A%22N%22%2C%22Adobe_VID%22%3A%22N%22%2C%22MSISDN%22%3A%22N%22%2C%22Account_Type%22%3A%22N%22%2C%22Support_LoggedIn%22%3A%22N%22%2C%22OMTR_BEACON%22%3A%22https%3A%2F%2Fsmetrics.t-mobile.com%2Fb%2Fss%2Ftmobusprod%2Ctmobustmocomprod%2F10%2FJS-1.7.0%2Fs26835724128918%3FAQB%3D1%26mid%3D36745466132230346268114653448642374204%26AQE%3D1%22%2C%22code_version%22%3A%2219.0.35%22%2C%22env%22%3A%22prd%22%2C%22terms%22%3A%22%22%2C%22browser%22%3A%22Chrome%2054%22%2C%22os%22%3A%22Windows%22%2C%22flash%22%3A%2223.0%22%2C%22hosted%22%3A%22true%22%2C%22referrer%22%3A%22%22%2C%22site%22%3A%22t-mobile.com%22%2C%22trigger_version%22%3A%2219.0.37HF1%22%2C%22pv%22%3A%225%22%2C%22locale%22%3A%22en%22%2C%22cxreplayaws%22%3A%22true%22%2C%22dn%22%3A%22tmobile%22%7D%2C%22pl%22%3A1%2C%22pv%22%3A5%2C%22def%22%3A2%2C%22browse-supportpv%22%3A5%2C%22rc%22%3A%22true%22%2C%22grft%22%3A1478766479469%2C%22mid%22%3A%22d464cf1-82903837-1c1f-5fbd-eee4d%22%2C%22rt%22%3Afalse%2C%22cncl%22%3Afalse%2C%22rpid%22%3A%22d464cf1-82798804-543b-a7bf-4212d%22%2C%22dn%22%3A%22tmobile%22%2C%22i%22%3A%22a%22%2C%22rw%22%3A1486347054915%7D",
                        "expires": null,
                        "httpOnly": false,
                        "secure": false
                    },
                    {
                        "name": "ClrCSTO",
                        "value": "T",
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
                        "name": "_medioCivicCookieControl",
                        "value": "enabledAtBootLoad=true,currentlyConsented=true",
                        "expires": null,
                        "httpOnly": false,
                        "secure": false
                    },
                    {
                        "name": "_medioSdk",
                        "value": "anon_id=925b1948-c0c2-465e-9470-60c3bc1fb53d,session_id=d7278e06-7ad8-4103-b580-9a1f44896ea3,session_ttl=1478766513828",
                        "expires": null,
                        "httpOnly": false,
                        "secure": false
                    },
                    {
                        "name": "__CT_Data",
                        "value": "gpv=49&apv_18_www15=48",
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
                        "name": "mbox",
                        "value": "PC#9aa2627608f8470bb58f8326c4ab504c.28_51#1542011301|session#2c58e2217ae94c1c85921b9ed3e95004#1478768361",
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
                        "name": "jive.security.context",
                        "value": "YK9QpG2lRo3lbYO+8+HDdP//////////gC2bNXSZT+lIN4xP1weEMoq64YsDD3U9RDzSrdMOMi5xflx0nSOu7suUfUtdt9yPfStNNfazLfVNIb5o",
                        "expires": null,
                        "httpOnly": false,
                        "secure": false
                    }
                ]
            }

            var options = {
                har: har,
                gzip: true,
                timeout: 30000,
                proxy: proxy
            };

            return rp(options)
                .then(function (body) {
                    var bodyStr = body.toString();
                    bodyStr = bodyStr.replace("throw 'allowIllegalResourceCall is false.';", "");
                    var bodyJson = JSON.parse(bodyStr);
                    var status = bodyJson.questionState;
                    entity.row[6] = status;
                    return entity;
                }).catch(function (err) {
                    if (err.message.indexOf('400') == -1) {
                        console.log('Answer status - ' + item.id + ' -> ' + err.message);
                        fs.appendFileSync('Errors.txt', 'Answer status - ' + url + ' -> ' + err.message + '\r\n');
                    }
                    return entity;
                });
        }).then(function (entity) {
            /** fetch all comments */
            var replyCount = entity.replyCount;
            var url = entity.url;
            var commentJson = entity.commentJson;
            console.log('Reply count is ' + replyCount);
            if (replyCount > 15) {
                var commentsPage = [];
                for (var i = 15; i < replyCount; i += 15) {
                    (function (k) {
                        commentsPage.push(url + '?start=' + k + '&tstart=0');
                    })(i);
                }

                return Promise.map(commentsPage, function singleCommentPage(commentUrl) {
                    var options = {
                        method: 'GET',
                        uri: url,
                        gzip: true,
                        timeout: 30000
                    };
                    return rp(options)
                        .then(function (body) {
                            var $ = cheerio.load(body);
                            $('.reply').each(function (index, element) {
                                var commenterId = $(this).find('.reply .j-post-author .jive-username-link').attr('data-userid');
                                var commentAuthor = $(this).find('.reply .j-post-author .jive-username-link').text();
                                var commenterStatus = '';
                                var replyTo = $(this).find('.j-thread-replyto').text();
                                var commentTime = $(this).find('.reply .j-post-author ').text().replace(commentAuthor, '').replace(replyTo, '').trim();
                                var commentContent = $(this).find('.reply .jive-rendered-content').text().trim();

                                var singleComment = {
                                    id: commenterId,
                                    author: commentAuthor,
                                    time: commentTime,
                                    status: commenterStatus,
                                    content: commentContent
                                }
                                commentJson.push(singleComment);
                            });

                            return entity;
                        }).catch(function (err) {
                            fs.appendFileSync('Error.txt', 'fetching comments error ' + commentUrl + ' - ' + err.message + '\r\n')
                        });
                }, { concurrency: 3 }).then(function () {
                    return entity;
                });
            } else {
                return entity;
            }
            ;
        }).then(function (entity) {
            // console.log(JSON.stringify(entity));
            /**  process poster status*/
            var posterName = entity.posterName;
            if (userStatus['' + posterName]) {
                console.log('Already fetched this user');
                entity.row[3] = userStatus['' + posterName];
                return entity;
            }
            console.log('User not fetched ' + posterName);
            var peopleUrl = 'https://support.t-mobile.com/api/core/v3/search/people?sort=relevanceDesc&filter=search%28' + posterName + '%29&origin=unknown&count=1&startIndex=0';
            var options = {
                method: 'GET',
                uri: peopleUrl,
                gzip: true,
                timeout: 30000
            };

            return rp(options)
                .then(function (body) {
                    var bodyStr = body.toString();
                    bodyStr = bodyStr.replace("throw 'allowIllegalResourceCall is false.';", "");
                    var bodyJson = JSON.parse(bodyStr);
                    var userLevel = bodyJson.list[0].jive.level.name;
                    entity.row[3] = userLevel;
                    userStatus['' + posterName] = userLevel;
                    return entity;
                }).catch(function (err) {
                    fs.appendFileSync('Error.txt', 'poster status error ' + peopleUrl + ' - ' + err.message + '\r\n');
                    return entity;
                });
        }).then(function (entity) {
            // console.log(JSON.stringify(entity));
            /** process comments */
            var commentJson = entity.commentJson;
            console.log('Start processing commenter status, all ' + commentJson.length + ' commenters');

            return Promise.map(commentJson, function singleCommenter(singleComment) {
                var commenterName = singleComment.author;
                if (userStatus['' + commenterName]) {
                    console.log('Already fetched this user');
                    singleComment.status = userStatus['' + commenterName];
                    return entity;
                } else {
                    console.log('User not fetched ' + commenterName);
                    var peopleUrl = 'https://support.t-mobile.com/api/core/v3/search/people?sort=relevanceDesc&filter=search%28' + commenterName + '%29&origin=unknown&count=1&startIndex=0';
                    var options = {
                        method: 'GET',
                        uri: peopleUrl,
                        gzip: true,
                        timeout: 30000
                    };
                    return rp(options)
                        .then(function (body) {
                            var bodyStr = body.toString();
                            bodyStr = bodyStr.replace("throw 'allowIllegalResourceCall is false.';", "");
                            var bodyJson = JSON.parse(bodyStr);
                            var userLevel = bodyJson.list[0].jive.level.name;
                            singleComment.status = userLevel
                            userStatus['' + commenterName] = userLevel;
                            return new Promise(function (res, rej) {
                                setTimeout(function () {
                                    res(entity);
                                }, timeout);
                            });
                        }).catch(function (err) {
                            fs.appendFileSync('Error.txt', 'commenter status error ' + singleComment.author + ' - ' + err.message + '\r\n')
                        });
                }
            }, { concurrency: 3 }).then(function () {
                return entity;
            });
        }).then(function (entity) {
            var commentJson = entity.commentJson;
            var row = entity.row;
            commentJson.forEach(function (singleJson, index, array) {
                if (singleJson.status == '') {
                    singleJson.status = 'Newbie Bronze';
                }
                row.push(singleJson.author);
                row.push(singleJson.time);
                row.push(singleJson.status);
                row.push(singleJson.content);
            });
            rows.push(row);
            return entity;
        }).catch(function (err) {
            //handle errors
            fs.appendFileSync('Error.txt', 'Outside error > ' + url + ' - ' + err.message + '\r\n');
        });
}
