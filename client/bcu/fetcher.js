/// <reference path="../../include.d.ts" />

var request = require('request');
var sTool = require('../../toolkits/stringtool.js');
var fs = require('fs');
var cheerio = require('cheerio');
var async = require('async');
var ew = require('node-xlsx');

var columns = ["RAZÓN SOCIAL", "DIRECCIÓN", "TELÉFONO", "FAX", "Estado", "Cod. Inst", "Pais", "Correo Electrónico"];
// fs.appendFileSync('result.csv', columns.join(',') + '\r\n');
var sheet1 = { name: 'data', data: [] };
sheet1.data.push(columns);

var har = {
				"postData": {
        "params": [{
            "name": "MSOWebPartPage_PostbackSource",
            "value": ""
        },
            {
                "name": "MSOTlPn_SelectedWpId",
                "value": ""
            },
            {
                "name": "MSOTlPn_View",
                "value": "0"
            },
            {
                "name": "MSOTlPn_ShowSettings",
                "value": "False"
            },
            {
                "name": "MSOGallery_SelectedLibrary",
                "value": ""
            },
            {
                "name": "MSOGallery_FilterString",
                "value": ""
            },
            {
                "name": "MSOTlPn_Button",
                "value": "none"
            },
            {
                "name": "__EVENTTARGET",
                "value": "ctl00$ctl25$g_c1c81e04_9942_423d_8996_97b45cbe94fd$ctl00$grdInstituciones"
            },
            {
                "name": "__EVENTARGUMENT",
                "value": "Page$2"
            },
            {
                "name": "__REQUESTDIGEST",
                "value": "0x05227A73CBA15A4F49E8600AB32B432AA79B980F6DD0F66C8E920DBB91528CE28C34E847CDA6427E825440ACFD52164CF40406A8FBC5ACA1BA214B238CE554FF,03 Aug 2016 07:45:53 -0000"
            },
            {
                "name": "MSOSPWebPartManager_DisplayModeName",
                "value": "Browse"
            },
            {
                "name": "MSOSPWebPartManager_ExitingDesignMode",
                "value": "false"
            },
            {
                "name": "MSOWebPartPage_Shared",
                "value": ""
            },
            {
                "name": "MSOLayout_LayoutChanges",
                "value": ""
            },
            {
                "name": "MSOLayout_InDesignMode",
                "value": ""
            },
            {
                "name": "_wpSelected",
                "value": ""
            },
            {
                "name": "_wzSelected",
                "value": ""
            },
            {
                "name": "MSOSPWebPartManager_OldDisplayModeName",
                "value": "Browse"
            },
            {
                "name": "MSOSPWebPartManager_StartWebPartEditingName",
                "value": "false"
            },
            {
                "name": "MSOSPWebPartManager_EndWebPartEditing",
                "value": "false"
            },
            {
                "name": "_maintainWorkspaceScrollPosition",
                "value": "0"
            },
            {
                "name": "__VIEWSTATE",
                "value": "/wEPDwUBMA9kFgJmD2QWAgIFD2QWBgIHD2QWBAUmZ19jMWM4MWUwNF85OTQyXzQyM2RfODk5Nl85N2I0NWNiZTk0ZmQPZBYCZg9kFgQCAw9kFgICAw8PZA8QFgFmFgEWAh4OUGFyYW1ldGVyVmFsdWUFGFZpZXdfQWNlc29yZXNEZUludmVyc2lvbhYBZmRkAgUPDxYCHgdWaXNpYmxlZ2QWAgIDDw9kDxAWAWYWARYCHwAFGFZpZXdfQWNlc29yZXNEZUludmVyc2lvbhYBZmRkBSZnX2U1NjRiZTkzXzA4MTZfNDIyYl84NGIyX2VlMTY5Mzg2NDNiYg9kFgRmDxYCHwFoZAIBDxYCHwFoZAIJD2QWBGYPZBYEAgEPFgIfAWgWAmYPZBYEAgIPZBYGAgEPFgIfAWhkAgMPFggeE0NsaWVudE9uQ2xpY2tTY3JpcHQFhwFqYXZhU2NyaXB0OkNvcmVJbnZva2UoJ1Rha2VPZmZsaW5lVG9DbGllbnRSZWFsJywxLCAxLCAnaHR0cDpcdTAwMmZcdTAwMmZ3d3cuYmN1Lmd1Yi51eVx1MDAyZlNlcnZpY2lvcy1GaW5hbmNpZXJvcy1TU0YnLCAtMSwgLTEsICcnLCAnJykeGENsaWVudE9uQ2xpY2tOYXZpZ2F0ZVVybGQeKENsaWVudE9uQ2xpY2tTY3JpcHRDb250YWluaW5nUHJlZml4ZWRVcmxkHgxIaWRkZW5TY3JpcHQFIVRha2VPZmZsaW5lRGlzYWJsZWQoMSwgMSwgLTEsIC0xKWQCBQ8WAh8BaGQCAw8PFgoeCUFjY2Vzc0tleQUBLx4PQXJyb3dJbWFnZVdpZHRoAgUeEEFycm93SW1hZ2VIZWlnaHQCAx4RQXJyb3dJbWFnZU9mZnNldFhmHhFBcnJvd0ltYWdlT2Zmc2V0WQLrA2RkAgMPZBYCAgEPZBYCAgMPZBYCAgEPPCsABQEADxYCHg9TaXRlTWFwUHJvdmlkZXIFEVNQU2l0ZU1hcFByb3ZpZGVyZGQCAQ9kFgYCBQ9kFgICAQ8QFgIfAWhkFCsBAGQCBw9kFgJmD2QWAmYPFCsAA2RkZGQCCQ8PFgQeBFRleHQFIEluaWNpYXIgZWwgcGFuZWwgZGVsIHByb2dyYW1hZG9yHwFoZGQCDw9kFgJmD2QWAgIBDw9kFgYeBWNsYXNzBSJtcy1zYnRhYmxlIG1zLXNidGFibGUtZXggczQtc2VhcmNoHgtjZWxscGFkZGluZwUBMB4LY2VsbHNwYWNpbmcFATBkGAMFF2N0bDAwJFRvcE5hdmlnYXRpb25NZW51Dw9kBRpQb3J0YWRhXFNpc3RlbWEgRmluYW5jaWVyb2QFSWN0bDAwJGN0bDI1JGdfYzFjODFlMDRfOTk0Ml80MjNkXzg5OTZfOTdiNDVjYmU5NGZkJGN0bDAwJGdyZEluc3RpdHVjaW9uZXMPFCsAAzwrAAoCAgIBCAIFAh4CO2QFTGN0bDAwJGN0bDI1JGdfYzFjODFlMDRfOTk0Ml80MjNkXzg5OTZfOTdiNDVjYmU5NGZkJGN0bDAwJGdyZEluc3RpdHVjaW9uZXNHcnAPFCsAA2cC/////w8C/////w9k2M638qkL6qkRNw+2YNOL7dWH6z0="
            },
            {
                "name": "__EVENTVALIDATION",
                "value": "/wEWDQLb/snUBwKB8LVnAq27+cMFAv3vtWcC2vfavwQCu5DanQYC5ObE/QIC5dWw5QYC7Mzv1QcChbPOugUChbPGugUChbPSugUChbPeugVLe4So+MJ3M978Pv6dswu+CJ1xAg=="
            },
            {
                "name": "ctl00$ctl32$ctl00",
                "value": "http://www.bcu.gub.uy/Servicios-Financieros-SSF"
            },
            {
                "name": "InputKeywords",
                "value": "Buscar en este sitio..."
            },
            {
                "name": "ctl00$ctl32$ctl04",
                "value": "0"
            },
            {
                "name": "ctl00$ctl25$g_c1c81e04_9942_423d_8996_97b45cbe94fd$ctl00$hdnVistaSql",
                "value": "View_AcesoresDeInversion"
            },
            {
                "name": "_wpcmWpid",
                "value": ""
            },
            {
                "name": "wpcmVal",
                "value": ""
            }],
        "mimeType": "application/x-www-form-urlencoded"
				},
				"queryString": [],
				"headers": [{
        "name": "Host",
        "value": "www.bcu.gub.uy"
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
            "name": "Origin",
            "value": "http://www.bcu.gub.uy"
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
            "value": "http://www.bcu.gub.uy/Servicios-Financieros-SSF/Paginas/ases_Inv.aspx"
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
            "value": "_gat=1; _ga=GA1.3.645053908.1470210276"
        }],
				// "bodySize": 2956,
				"url": "http://www.bcu.gub.uy/Servicios-Financieros-SSF/Paginas/ases_Inv.aspx",
				"cookies": [{
        "name": "_gat",
        "value": "1"
				},
        {
            "name": "_ga",
            "value": "GA1.3.645053908.1470210276"
        }],
				"method": "POST",
				"httpVersion": "HTTP/1.1"
};

request({ har: har, gzip: true }, function (err, resp, body) {
    var $ = cheerio.load(body);
    $('#ctl00_ctl25_g_c1c81e04_9942_423d_8996_97b45cbe94fd_ctl00_pnlUnGrouped .ms-alternating').each(function (index, element) {
        var rs = $(this).find('td').eq(0).find('a').text();
        var dire = $(this).find('td').eq(1).find('span').text();
        var tele = $(this).find('td').eq(2).find('span').text();
        var fax = $(this).find('td').eq(3).find('span').text();

        var link = 'http://www.bcu.gub.uy' + $(this).find('td').eq(0).find('a').attr('href');
        request({ url: link, method: 'GET', gzip: 'true' }, function (err, resp, body) {
            var $ = cheerio.load(body);
            var estado = $('#ctl00_ctl25_g_69ba7a44_6c44_4cfc_b1c0_7533ca184061_ctl00_lblEstado').text();
            var codinst = $('#ctl00_ctl25_g_69ba7a44_6c44_4cfc_b1c0_7533ca184061_ctl00_lblCodInst').text();
            var pais = $('#ctl00_ctl25_g_69ba7a44_6c44_4cfc_b1c0_7533ca184061_ctl00_lblPais').text();
            var email = $('#ctl00_ctl25_g_69ba7a44_6c44_4cfc_b1c0_7533ca184061_ctl00_HplCorreoElectronico').text();
            var row = [];
            row.push(rs);
            row.push(dire);
            row.push(tele);
            row.push(fax);
            row.push(estado);
            row.push(codinst);
            row.push(pais);
            row.push(email);
            console.log(row);
            sheet1.data.push(row);
            var buffer = ew.build([sheet1]);
            fs.writeFileSync('result1.xlsx', buffer);
            // fs.appendFileSync('result.csv', row.join(',') + '\r\n');
        });
    });
});


