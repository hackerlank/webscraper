/// <reference path="../../include.d.ts" />

var request = require('request');
var sTool = require('../../toolkits/stringtool.js');
var fs = require('fs');
var cheerio = require('cheerio');
var async = require('async');
var ExcelWriter = require('../../private/ExcelWriter.js');
var golfHar = {
				"headersSize": 1621,
				"postData": {
        "text": "",
        "mimeType": ""
				},
				"queryString": [],
				"headers": [{
        "name": "Host",
        "value": "www.oddschecker.com"
				},
        {
            "name": "Connection",
            "value": "keep-alive"
        },
        {
            "name": "Cache-Control",
            "value": "max-age=0"
        },
        {
            "name": "Upgrade-Insecure-Requests",
            "value": "1"
        },
        {
            "name": "User-Agent",
            "value": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.84 Safari/537.36"
        },
        {
            "name": "Accept",
            "value": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8"
        },
        {
            "name": "Accept-Encoding",
            "value": "gzip, deflate, sdch"
        },
        {
            "name": "Accept-Language",
            "value": "zh-CN,zh;q=0.8"
        },
        {
            "name": "Cookie",
            "value": "odds_type=traditional; odds_default_stake=10; mobile_redirect=true; mobile_welcome_centre=false; basket=\"\"; myoc_device=NDM3ZGQ2YWMtZGU3Yy00NjI4LTliZDUtZWZlOTQyMWVhYTkx; G_ENABLED_IDPS=google; localCacheBuster=1.0.5; odds_grid_clicks=1; session-id=4EE7C150A6D9ADEB98F2420628302BCE; session-id=4EE7C150A6D9ADEB98F2420628302BCE; number_access=2; logged_in=false; recently_viewed=Open+Championship+-+Winner#golf%2Fopen-championship%2Fwinner##Open+Championship+-+Winner#golf%2Fopen-championship%2Fwinner##; s_pers=%20cmp_cookie%3Ddirect%2520load%7C1471315216131%3B%20s_nr%3D1468763513592-Repeat%7C1500299513592%3B%20s_getNewRepeat%3D1468763513614-Repeat%7C1471355513614%3B%20s_vnum%3D1471315216139%2526vn%253D2%7C1471315216139%3B%20s_invisit%3Dtrue%7C1468765313623%3B%20s_fid%3D1E28FDAB81ECF45B-2FC21FC87BDD052B%7C1531835513632%3B; s_sess=%20c%3DundefinedDirect%2520LoadDirect%2520Load%3B%20cmp_cookie_session%3Ddirect%2520load%3B%20omni_prev_URL%3Dhttp%253A%252F%252Fwww.oddschecker.com%252Fgolf%252Fopen-championship%252Fwinner%3B%20s_ctq%3D1%3B%20s_cc%3Dtrue%3B%20s_sq%3D%3B; _ga=GA1.2.1950378053.1468723217; sc.ASP.NET_SESSIONID=undefined; sc.Status=5"
        }],
				"bodySize": 0,
				"url": "http://www.oddschecker.com/golf/open-championship/winner",
				"cookies": [{
        "name": "odds_type",
        "value": "traditional"
				},
        {
            "name": "odds_default_stake",
            "value": "10"
        },
        {
            "name": "mobile_redirect",
            "value": "true"
        },
        {
            "name": "mobile_welcome_centre",
            "value": "false"
        },
        {
            "name": "basket",
            "value": "\"\""
        },
        {
            "name": "myoc_device",
            "value": "NDM3ZGQ2YWMtZGU3Yy00NjI4LTliZDUtZWZlOTQyMWVhYTkx"
        },
        {
            "name": "G_ENABLED_IDPS",
            "value": "google"
        },
        {
            "name": "localCacheBuster",
            "value": "1.0.5"
        },
        {
            "name": "odds_grid_clicks",
            "value": "1"
        },
        {
            "name": "session-id",
            "value": "4EE7C150A6D9ADEB98F2420628302BCE"
        },
        {
            "name": "session-id",
            "value": "4EE7C150A6D9ADEB98F2420628302BCE"
        },
        {
            "name": "number_access",
            "value": "2"
        },
        {
            "name": "logged_in",
            "value": "false"
        },
        {
            "name": "recently_viewed",
            "value": "Open+Championship+-+Winner#golf%2Fopen-championship%2Fwinner##Open+Championship+-+Winner#golf%2Fopen-championship%2Fwinner##"
        },
        {
            "name": "s_pers",
            "value": "%20cmp_cookie%3Ddirect%2520load%7C1471315216131%3B%20s_nr%3D1468763513592-Repeat%7C1500299513592%3B%20s_getNewRepeat%3D1468763513614-Repeat%7C1471355513614%3B%20s_vnum%3D1471315216139%2526vn%253D2%7C1471315216139%3B%20s_invisit%3Dtrue%7C1468765313623%3B%20s_fid%3D1E28FDAB81ECF45B-2FC21FC87BDD052B%7C1531835513632%3B"
        },
        {
            "name": "s_sess",
            "value": "%20c%3DundefinedDirect%2520LoadDirect%2520Load%3B%20cmp_cookie_session%3Ddirect%2520load%3B%20omni_prev_URL%3Dhttp%253A%252F%252Fwww.oddschecker.com%252Fgolf%252Fopen-championship%252Fwinner%3B%20s_ctq%3D1%3B%20s_cc%3Dtrue%3B%20s_sq%3D%3B"
        },
        {
            "name": "_ga",
            "value": "GA1.2.1950378053.1468723217"
        },
        {
            "name": "sc.ASP.NET_SESSIONID",
            "value": "undefined"
        },
        {
            "name": "sc.Status",
            "value": "5"
        }],
				"method": "GET",
				"httpVersion": "HTTP/1.1"
};
request({url : 'http://www.oddschecker.com/golf/open-championship/winner', method : 'GET' , har : golfHar, gzip : true }, function(err, resp, body) {
        if(err) console.log(err);
        fs.appendFileSync('body.html', body);
       	var columns = [];
        var $ = cheerio.load(body);
        $('.eventTableHeader td').each(function(index, item) {
            columns.push($(this).attr('data-bk'));
        });
        var ew = new ExcelWriter('result_oddschecker.xlsx', ['name'].concat(columns), 'winner');

        $('#t1').find('tr').each(function(index, item) {
            var row = [];
            $(this).find('td').each(function(i, td) {
                   if(i == 0) {
                       row.push($(this).find('a').text());
                   } else {
                       row.push($(this).text());
                   }
            });
            ew.appendRow(row);
            ew.build();
        });
        
});


