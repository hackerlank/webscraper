
/// <reference path="../../include.d.ts" />

var rp = require('request-promise');
var Promise = require('bluebird');
var cheerio = require('cheerio');
var ew = require('node-xlsx');
var fs = require('fs');


var columns = ["Name", "Department", "Phone", "Email"];
var sheet = { name: 'result', data: [] };
sheet.data.push(columns);
var rows = sheet.data;

var timeout = 1000;


var offsets = [];

for (var i = 0; i < 30420; i = i + 10) {
    (function (k) {
        offsets.push(k);
    } (i));
}

// offsets = offsets.slice(0, 10);

/** function to print excel */
var printToExcel = function () {
    var buffer = ew.build([sheet]);
    fs.writeFileSync('cmich.xlsx', buffer);
    console.log('Everything was done successfully');
}

Promise.all(Promise.map(offsets, singleRequest, { concurrency: 5 })).then(printToExcel);

/** Single Req */
function singleRequest(offset) {

    var har = {
        "method": "POST",
        "url": "https://go.cmich.edu/search/_vti_bin/client.svc/ProcessQuery",
        "httpVersion": "HTTP/1.1",
        "headers": [
            {
                "name": "Cookie",
                "value": "SPUsageId=4d030f04-a771-4e3b-a76f-f4f1b7786e07; CMichLBSessionId=62a04c4e005523a794218a4c6671d904; ASP.NET_SessionId=zqgqa552ymr3sl34fzrx1am5; SearchSession=989a13e1%2D6a4d%2D471b%2D934d%2D62006e00abb9; _ga=GA1.3.1209478019.1477288374; WSS_FullScreenMode=false"
            },
            {
                "name": "Origin",
                "value": "https://go.cmich.edu"
            },
            {
                "name": "Accept-Encoding",
                "value": "gzip, deflate, br"
            },
            {
                "name": "Host",
                "value": "go.cmich.edu"
            },
            {
                "name": "Accept-Language",
                "value": "en-US,en;q=0.8"
            },
            {
                "name": "User-Agent",
                "value": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36"
            },
            {
                "name": "Content-Type",
                "value": "text/xml"
            },
            {
                "name": "Accept",
                "value": "*/*"
            },
            {
                "name": "Referer",
                "value": "https://go.cmich.edu/search/Pages/people.aspx?k=a*"
            },
            {
                "name": "X-Requested-With",
                "value": "XMLHttpRequest"
            },
            {
                "name": "Connection",
                "value": "keep-alive"
            },
            {
                "name": "X-RequestDigest",
                "value": "0x7A3ECE3AF77B4201585CDCA3AC103C1A3F400FF0B9B6B86359325B4F76C7EB21FCABB7924DF36E5DA5F5AEAE64905CF5EDBAD9576D09C32BF4304A751B3C0361,24 Oct 2016 06:02:55 -0000"
            }
        ],
        "queryString": [],
        "cookies": [
            {
                "name": "SPUsageId",
                "value": "4d030f04-a771-4e3b-a76f-f4f1b7786e07",
                "expires": null,
                "httpOnly": false,
                "secure": false
            },
            {
                "name": "CMichLBSessionId",
                "value": "62a04c4e005523a794218a4c6671d904",
                "expires": null,
                "httpOnly": false,
                "secure": false
            },
            {
                "name": "ASP.NET_SessionId",
                "value": "zqgqa552ymr3sl34fzrx1am5",
                "expires": null,
                "httpOnly": false,
                "secure": false
            },
            {
                "name": "SearchSession",
                "value": "989a13e1%2D6a4d%2D471b%2D934d%2D62006e00abb9",
                "expires": null,
                "httpOnly": false,
                "secure": false
            },
            {
                "name": "_ga",
                "value": "GA1.3.1209478019.1477288374",
                "expires": null,
                "httpOnly": false,
                "secure": false
            },
            {
                "name": "WSS_FullScreenMode",
                "value": "false",
                "expires": null,
                "httpOnly": false,
                "secure": false
            }
        ],
        "postData": {
            "mimeType": "text/xml",
            "text": "<Request xmlns=\"http://schemas.microsoft.com/sharepoint/clientquery/2009\" SchemaVersion=\"15.0.0.0\" LibraryVersion=\"15.0.0.0\" ApplicationName=\"Javascript Library\"><Actions><ObjectPath Id=\"171\" ObjectPathId=\"170\" /><SetProperty Id=\"172\" ObjectPathId=\"170\" Name=\"ImpressionID\"><Parameter Type=\"String\">41389629_3318_1033</Parameter></SetProperty><SetProperty Id=\"173\" ObjectPathId=\"170\" Name=\"TimeZoneId\"><Parameter Type=\"Number\">10</Parameter></SetProperty><SetProperty Id=\"174\" ObjectPathId=\"170\" Name=\"QueryText\"><Parameter Type=\"String\">a*</Parameter></SetProperty><SetProperty Id=\"175\" ObjectPathId=\"170\" Name=\"QueryTemplate\"><Parameter Type=\"String\">{searchboxquery}</Parameter></SetProperty><ObjectPath Id=\"177\" ObjectPathId=\"176\" /><Method Name=\"Add\" Id=\"178\" ObjectPathId=\"176\"><Parameters><Parameter Type=\"String\">OnlinePeopleFullName</Parameter><Parameter Type=\"Number\">0</Parameter></Parameters></Method><SetProperty Id=\"179\" ObjectPathId=\"170\" Name=\"StartRow\"><Parameter Type=\"Number\">" + offset + "</Parameter></SetProperty><SetProperty Id=\"180\" ObjectPathId=\"170\" Name=\"Culture\"><Parameter Type=\"Number\">-1</Parameter></SetProperty><SetProperty Id=\"181\" ObjectPathId=\"170\" Name=\"RowsPerPage\"><Parameter Type=\"Number\">40000</Parameter></SetProperty><SetProperty Id=\"182\" ObjectPathId=\"170\" Name=\"RowLimit\"><Parameter Type=\"Number\">40000</Parameter></SetProperty><SetProperty Id=\"183\" ObjectPathId=\"170\" Name=\"TotalRowsExactMinimum\"><Parameter Type=\"Number\">40000</Parameter></SetProperty><SetProperty Id=\"184\" ObjectPathId=\"170\" Name=\"SourceId\"><Parameter Type=\"Guid\">{5f6397d7-27b1-4b09-a941-fe504649b762}</Parameter></SetProperty><ObjectPath Id=\"186\" ObjectPathId=\"185\" /><Method Name=\"SetQueryPropertyValue\" Id=\"187\" ObjectPathId=\"185\"><Parameters><Parameter Type=\"String\">SourceName</Parameter><Parameter TypeId=\"{b25ba502-71d7-4ae4-a701-4ca2fb1223be}\"><Property Name=\"BoolVal\" Type=\"Boolean\">false</Property><Property Name=\"IntVal\" Type=\"Number\">0</Property><Property Name=\"QueryPropertyValueTypeIndex\" Type=\"Number\">1</Property><Property Name=\"StrArray\" Type=\"Null\" /><Property Name=\"StrVal\" Type=\"String\">Online People</Property></Parameter></Parameters></Method><Method Name=\"SetQueryPropertyValue\" Id=\"188\" ObjectPathId=\"185\"><Parameters><Parameter Type=\"String\">SourceLevel</Parameter><Parameter TypeId=\"{b25ba502-71d7-4ae4-a701-4ca2fb1223be}\"><Property Name=\"BoolVal\" Type=\"Boolean\">false</Property><Property Name=\"IntVal\" Type=\"Number\">0</Property><Property Name=\"QueryPropertyValueTypeIndex\" Type=\"Number\">1</Property><Property Name=\"StrArray\" Type=\"Null\" /><Property Name=\"StrVal\" Type=\"String\">Ssa</Property></Parameter></Parameters></Method><ObjectPath Id=\"190\" ObjectPathId=\"189\" /><Method Name=\"Add\" Id=\"191\" ObjectPathId=\"189\"><Parameters><Parameter Type=\"String\">OnlinePeopleFullName</Parameter></Parameters></Method><Method Name=\"Add\" Id=\"192\" ObjectPathId=\"189\"><Parameters><Parameter Type=\"String\">OnlinePeopleTitle</Parameter></Parameters></Method><Method Name=\"Add\" Id=\"193\" ObjectPathId=\"189\"><Parameters><Parameter Type=\"String\">OnlinePeopleDepartmentName</Parameter></Parameters></Method><Method Name=\"Add\" Id=\"194\" ObjectPathId=\"189\"><Parameters><Parameter Type=\"String\">OnlinePeoplePhone</Parameter></Parameters></Method><Method Name=\"Add\" Id=\"195\" ObjectPathId=\"189\"><Parameters><Parameter Type=\"String\">OnlinePeopleEmail</Parameter></Parameters></Method><Method Name=\"Add\" Id=\"196\" ObjectPathId=\"189\"><Parameters><Parameter Type=\"String\">OnlinePeopleDepartmentCode</Parameter></Parameters></Method><Method Name=\"Add\" Id=\"197\" ObjectPathId=\"189\"><Parameters><Parameter Type=\"String\">OnlinePeopleAddress</Parameter></Parameters></Method><ObjectPath Id=\"199\" ObjectPathId=\"198\" /><Method Name=\"Add\" Id=\"200\" ObjectPathId=\"198\"><Parameters><Parameter Type=\"String\">Title</Parameter></Parameters></Method><Method Name=\"Add\" Id=\"201\" ObjectPathId=\"198\"><Parameters><Parameter Type=\"String\">Path</Parameter></Parameters></Method><Method Name=\"Add\" Id=\"202\" ObjectPathId=\"198\"><Parameters><Parameter Type=\"String\">Author</Parameter></Parameters></Method><Method Name=\"Add\" Id=\"203\" ObjectPathId=\"198\"><Parameters><Parameter Type=\"String\">SectionNames</Parameter></Parameters></Method><Method Name=\"Add\" Id=\"204\" ObjectPathId=\"198\"><Parameters><Parameter Type=\"String\">SiteDescription</Parameter></Parameters></Method><Method Name=\"SetQueryPropertyValue\" Id=\"205\" ObjectPathId=\"185\"><Parameters><Parameter Type=\"String\">ListId</Parameter><Parameter TypeId=\"{b25ba502-71d7-4ae4-a701-4ca2fb1223be}\"><Property Name=\"BoolVal\" Type=\"Boolean\">false</Property><Property Name=\"IntVal\" Type=\"Number\">0</Property><Property Name=\"QueryPropertyValueTypeIndex\" Type=\"Number\">1</Property><Property Name=\"StrArray\" Type=\"Null\" /><Property Name=\"StrVal\" Type=\"String\">f566bf26-62e6-430a-af54-a99807df9345</Property></Parameter></Parameters></Method><Method Name=\"SetQueryPropertyValue\" Id=\"206\" ObjectPathId=\"185\"><Parameters><Parameter Type=\"String\">ListItemId</Parameter><Parameter TypeId=\"{b25ba502-71d7-4ae4-a701-4ca2fb1223be}\"><Property Name=\"BoolVal\" Type=\"Boolean\">false</Property><Property Name=\"IntVal\" Type=\"Number\">4</Property><Property Name=\"QueryPropertyValueTypeIndex\" Type=\"Number\">2</Property><Property Name=\"StrArray\" Type=\"Null\" /><Property Name=\"StrVal\" Type=\"Null\" /></Parameter></Parameters></Method><SetProperty Id=\"207\" ObjectPathId=\"170\" Name=\"ResultsUrl\"><Parameter Type=\"String\">https://go.cmich.edu/search/Pages/people.aspx?k=a*#Default=%7B%22k%22%3A%22a*%22%7D#fc4fa7f6-fefa-4cfe-ab00-3a4aad8c1beb=%7B%22k%22%3A%22a*%22%7D</Parameter></SetProperty><SetProperty Id=\"208\" ObjectPathId=\"170\" Name=\"BypassResultTypes\"><Parameter Type=\"Boolean\">true</Parameter></SetProperty><SetProperty Id=\"209\" ObjectPathId=\"170\" Name=\"ClientType\"><Parameter Type=\"String\">UI</Parameter></SetProperty><SetProperty Id=\"210\" ObjectPathId=\"170\" Name=\"ProcessBestBets\"><Parameter Type=\"Boolean\">false</Parameter></SetProperty><Method Name=\"SetQueryPropertyValue\" Id=\"211\" ObjectPathId=\"185\"><Parameters><Parameter Type=\"String\">QuerySession</Parameter><Parameter TypeId=\"{b25ba502-71d7-4ae4-a701-4ca2fb1223be}\"><Property Name=\"BoolVal\" Type=\"Boolean\">false</Property><Property Name=\"IntVal\" Type=\"Number\">0</Property><Property Name=\"QueryPropertyValueTypeIndex\" Type=\"Number\">1</Property><Property Name=\"StrArray\" Type=\"Null\" /><Property Name=\"StrVal\" Type=\"String\">989a13e1-6a4d-471b-934d-62006e00abb9</Property></Parameter></Parameters></Method><SetProperty Id=\"212\" ObjectPathId=\"170\" Name=\"ProcessPersonalFavorites\"><Parameter Type=\"Boolean\">false</Parameter></SetProperty><SetProperty Id=\"213\" ObjectPathId=\"170\" Name=\"SafeQueryPropertiesTemplateUrl\"><Parameter Type=\"String\">querygroup://webroot/Pages/people.aspx?groupname=Default</Parameter></SetProperty><SetProperty Id=\"214\" ObjectPathId=\"170\" Name=\"IgnoreSafeQueryPropertiesTemplateUrl\"><Parameter Type=\"Boolean\">false</Parameter></SetProperty><ObjectPath Id=\"216\" ObjectPathId=\"215\" /><ExceptionHandlingScope Id=\"217\"><TryScope Id=\"219\"><Method Name=\"ExecuteQueries\" Id=\"221\" ObjectPathId=\"215\"><Parameters><Parameter Type=\"Array\"><Object Type=\"String\">089b0002-03dc-4906-a89a-8a476199d504Default</Object></Parameter><Parameter Type=\"Array\"><Object ObjectPathId=\"170\" /></Parameter><Parameter Type=\"Boolean\">true</Parameter></Parameters></Method></TryScope><CatchScope Id=\"223\" /></ExceptionHandlingScope></Actions><ObjectPaths><Constructor Id=\"170\" TypeId=\"{80173281-fffd-47b6-9a49-312e06ff8428}\" /><Property Id=\"176\" ParentId=\"170\" Name=\"SortList\" /><Property Id=\"185\" ParentId=\"170\" Name=\"Properties\" /><Property Id=\"189\" ParentId=\"170\" Name=\"SelectProperties\" /><Property Id=\"198\" ParentId=\"170\" Name=\"HitHighlightedProperties\" /><Constructor Id=\"215\" TypeId=\"{8d2ac302-db2f-46fe-9015-872b35f15098}\" /></ObjectPaths></Request>"
        }

    }
    var options = {
        method: 'POST',
        har: har,
        gzip: true
    };

    return rp(options)
        .then(function (body) {
            // var bodyStr = body.toString().replace('\r\n', '');
            // while (bodyStr.indexOf('\r\n') !== -1) {
            //     bodyStr = bodyStr.replace('\r\n', '');
            // }
            // fs.writeFileSync('body.txt', bodyStr);
            // var rowsStr = bodyStr.match(/ResultRows":(\[.*\]),"ResultTitle/)[1];
            // var rowsJson = JSON.parse(rowsStr);
            var body = JSON.parse(body);
            var level1 = body[14];
            var ResultTables;
            for (var key in level1) {
                if (key.indexOf('Default') !== -1) {
                    ResultTables = level1[key].ResultTables;
                }
            }

            if (!ResultTables) {
                return false;
            }

            var rowsJson = ResultTables[0].ResultRows;

            rowsJson.forEach(function (student, index, array) {
                if (student.OnlinePeopleTitle === 'Student') {
                    var OnlinePeopleFullName = student.OnlinePeopleFullName;
                    var OnlinePeopleDepartmentName = student.OnlinePeopleDepartmentName;
                    var OnlinePeoplePhone = student.OnlinePeoplePhone;
                    var OnlinePeopleEmail = student.OnlinePeopleEmail;
                    rows.push([OnlinePeopleFullName, OnlinePeopleDepartmentName, OnlinePeoplePhone, OnlinePeopleEmail]);
                }
            });
            return new Promise(function (res, rej) {
                setTimeout(function () {
                    res(offset);
                }, timeout);
            });

        }).then(function (url) {
            console.log(offset + ' was done');
        }).catch(function (err) {
            //handle errors
            if (err) console.log(err);
        });
}
