/// <reference path="../../include.d.ts" />

var rp = require('request-promise');
var Promise = require('bluebird');
var cheerio = require('cheerio');
var ew = require('node-xlsx');
var fs = require('fs');

rp = rp.defaults({timeout: 30000});
// rp = rp.defaults({proxy : "http://43.241.225.182:20225", timeout: 30000});
// rp = rp.defaults({proxy : "http://test2.qypac.net:52106", timeout: 30000});
// rp = rp.defaults({proxy : "http://124.88.67.24:83", timeout: 30000});


var timeout = 1500;

var alreadyDone = ["boston", "chicago", "dallas", "denver", "houston", "losangeles", "memphis", "miami", "milwaukee", "newjersey", "newyork", "orangecounty", "phoenix", "portland", "sacramento", "sandiego", "seattle", "utica"].concat(fs.readFileSync('CitiesDone.txt').toString().split('\r\n'));

var domains = fs.readFileSync('domains.txt').toString().split('\r\n');
// domains = ["bigbend.craigslist.org"];
var workingDomains = [];
domains.forEach(function (domain, index, array) {
    var cityName = domain.split('.')[0];
    if (alreadyDone.indexOf(cityName) == -1) {
        var entity = {};
        entity["prefix"] = 'https://' + cityName + '.craigslist.org';
        entity['base'] = 'https://' + domain + '/search/cta?sort=date&max_auto_year=1984&min_auto_year=1900&min_price=5000&s=';
        entity['optName'] = 'links_' + cityName + '.txt';
        entity['cityName'] = cityName;
        workingDomains.push(entity);
    }
});
console.log('Here ' + workingDomains.length + ' cities still need to be done')
/** compose url by yourself */


Promise.all(Promise.map(workingDomains, singleRequest, {concurrency: 1})).then();


/** Single Req */
function singleRequest(entity) {
    /** Fetch urls */
    var url = entity.base;
    var optName = entity.optName;
    var prefix = entity.prefix;
    var options = {
        method: 'GET',
        uri: url,
        headers: {},
        gzip: true
    };
    /** Context for one city */
    var context = {};
    context["cityName"] = entity.cityName;
    context["prefix"] = entity.prefix;
    var urls = [];
    return rp(options)
        .then(function (body) {
            var $ = cheerio.load(body);
            var count = $('.totalcount').eq(0).text();
            var bodyStr = body.toString();
            var state = bodyStr.match(/areaRegion\s=\s"([A-Z]+)"/)[1];
            console.log(state + ' get');
            for (var i = 0; i < count; i += 100) {
                (function (k) {
                    urls.push(url + k);
                }(i));
            }
            context["listPageUrls"] = urls;
            context["state"] = state;
            return new Promise(function (res, rej) {
                setTimeout(function () {
                    res(context);
                }, timeout);
            });

        }).then(function (context) {
                var urls = context.listPageUrls;
                console.log(urls.length + ' was fetched for ' + context.cityName);
                var detailsLinks = [];
                return Promise.map(urls, function collectUrls(pageLink) {
                    var options = {
                        method: 'GET',
                        uri: pageLink,
                        headers: {},
                        gzip: true
                    };
                    return rp(options).then(function (body) {
                        var $ = cheerio.load(body);
                        $('.result-info').each(function (index, element) {
                            var hrefAttr = $(this).find('a').eq(0).attr('href');
                            var href = '';
                            if (hrefAttr.startsWith('//')) {
                                href = 'https:' + hrefAttr;
                            } else {
                                href = prefix + hrefAttr;
                            }
                            if (href.indexOf(context.cityName) == -1) {
                                return;
                            }
                            // fs.appendFileSync(optName, href + '\r\n');
                            detailsLinks.push(href);
                        });
                        context["detailsLinks"] = detailsLinks;
                        return detailsLinks;
                    });
                }, {concurrency: 3}).then(function () {
                    return context;
                });
            }
        ).then(function (context) {
            var detailsLinks = context.detailsLinks;
            // detailsLinks = fs.readFileSync('links_sfbay.txt').toString().split('\r\n');
            console.log('start working on details, ' + detailsLinks.length + ' details page would be done ')
            var prefix = context.prefix;
            // var originalGoogleResponse = "03AHJ_VutOYUFcoWQUhWf1NeioaQWCeat_27uUFDwz0RqFHYY9Kmbxz1WSSri2-mhwWh1u9XGlax7YE8cvTF1UJWd1w8uHEOdIrzembk3nSEQobDyq0katZDxguhKBYfzfSqYVVfNBwSmSxnsD22P3oOabhfjB2o6aIY8FGEOdOeKZvkQG3cLAD7rTp1DA8rZNfo5sklCZmpjpDz9TPUaBa5B56uf-1aW1J2jRjPRgMsqZeihhBhzZq_9beP9z_z247j9v1VyQStDMbYGUJ20xhYIENZkH1ITBpUk-498ewiZitavEV7tw4rLVzWV5RFkPPTurwkGyCwwLjv9g2yu4gvmcq5nWattidGJ93K1VMsWfeVcB8dPWB7hQWD0NIU8VRtNkeR2oSWFem0XxGaBkbnoBbwgL90eDA4jOr06EN7RTSVXWak85MeIXAGRyAQg3f9JeBBxpjei7IAL6aFwVqfB1KjoS8c30L066fYPZOAtSGWDqf2LJo93BRPWhq_6EQpBOPFPwZXoyjG-OsotJDwwPSyqnhAz0ErUwWOM5T1UKCMvJSNRAyy5TdLZPkccEFKaICzXvcfqI6UW5WeuTqEtAV3UcYY5gl90x8J00xToWu2BdK_x88tMdSf2Zg72yDq-nymyqtX-QFA9k6EEWUznsr8RMp3b1VSqWvAlGhTCWnfhUbqjwyo5Zsu14Clyk_TCRAtyzArj6bGKJVn7JTs2pKZTorsftcpaedUXaa6YijRGwkWRmYHMc1Sw-ZiD8ZuFwlXhreQkDvu5ODYMCxVeAMhk2ztv8_YlglAQZefrdK0ixKVHGn1YFjceKThvFc_zB4r6jL-3aUjLe6DEoc0lzGdgmnAOWnfoR3TP_XAA0TEPI4VFc6vEEWpB-XHN3eMom9rpgiCJr2G1VAw3PpgP2Cg635f_xj93PheSGDllSLgeaM3pWt8lSUI8o0CIFO_AQJ1URoV4G";
            // var originalN = "U2FsdGVkX18zMTcwNTMxN0yit8sriwABzAoVARLT9H8mPaWGse6hVdiS8UjwDyhBe71IGOZI12sccFpwJvo0anovldisGAN5U9OqkeuclFnkN156xLuWNg";
            // var originalGoogleResponse = "03AHJ_VuvrvISTDL3_MJjNQDRl9cYEeISk3G4C157QMsxBqSaBfpWhHyEIySQVHOnfECsOeloUDV9jEek2lsrTUCTllEcT-yF8kgsK_qnREri_Shu7Tp2FQpB1ntq0vaXTDLGE8yidrWjja7ufHMIvukiQYF1eZEbdrUVNQAq8pdXPJHznfi-aFEjxDd-HxYnQK221as2RA_Iqgr_5yj_zWkouW12t4_-ATK8og9Lh9NuNibQVWIjfapL0qaqt1EbMxlD1iP3NZRikJzX62YR3wcLORUFCHai0a1q3fxvOfcIKHpk3G4-WOBoIQroiSOcl9S1q_BYF_UKcF4RCQvXbADtsLCSrMPQeCTfwygkvbdC4EU7Qg5dW87k4H8m2EuoWr4tcRsBbXEmei18rm4xG-slWH8vxUnPl2PPzptDdszmdSqXsfZpFmtt0OdxIc7AKKs9ze8iIeUQ5Y0dRQhhNDQ1QWcxNFzduEqdLt5p_hoMA1c7OgwzkjvD2ARRiaeeQbQ5LJOJ5b6SiYiOE-jssQNDoXpt--vv6__RQsZF8GOXKTOm4w9LY5kIlGokcyb6se9Omrg12yb2Tqtj9IRNUo623jlXhH1NaWYXwcowwwQ5nCapa2rVzLQIaiXRw5OjLxbjm6xucd5yeiXaAU0WTkwt3kAmsaZGZC67l1L89UjfRgdNn3J5r_yAN3SQBSM0IKqIe_YR3Nvmp-ZzpGxk3wBOIuMnYM_v8LNbauumB5zI_A-_GRgqFzyGUN-_dGCcerwcDqfuGZZdNngcLUnHnxY3K_ubdbBZBtDDb7vyuf9gxn9CiIRnZREM7uqTwiRXOWcvyYNH-tKG6NKqJDk2BX9L62gJVxo8Qv_lF1b5PYySUtkQGxVuIfAYIFeShEk7LGZuwluAlIzR6cpGUHxK3-xy8dpJ5OT6PO1qeA8jEkpllbjt8as24N2CDyfqTkZApgPGX-OSAXaQ-";
            // var originalN = "U2FsdGVkX18yNDI5OTI0MnV17abtTG8uiXkrO9LB_6WQKR9_ZEH1pGsoq2d_IhAaoBfzF4elJjPUEd2HJs-t4hM2WJIWxRzaIhLu1RUVhGus-hwLOWqzpQ";
            // var originalGoogleResponse = "03AHJ_VutIQQSCwC1dfcikoaOd5JgLLf3quu0wEk6DpHW0jLwToaJWX9dugcGNGGGyh9TZjs4ZXsgW8gYi_ETZWCig0xsqH2L0x1PAwlrKWRPvwCsbjp1Qe0lHEO6RtAOW3gCacV_xJKjDf6C0ZR5Qr578az4AL7Vwo_H6MKFsQESof3cLJ-Dzpjl3BnnrxSE9Ranjfv66akkm7YOg0gYPVlTdru96rD69kiyvl3Czr_wVS_hU9A-Pswo5VYQG1vriwhdmIJ34smuPKBWEjp4OFbvKVjwlNZgXYE_8zRtRnaUsNhRRiH6BQA4mLhlwOrkFagCtrkWacuXkJAnrcbnl9vK52Q79XjUBKPoNRp6m-3UuKXvAtvWTKlVCEbyn9vuKcJWXNu_bfuT54ElHdED7LusGlmjV4uxIkonUKc4O57LZKlC7wGAxqI9pty2hC5f8yQjNY4XmhfHFHO8eL6gcQ4633S2FLcfsd51qjJ5gnFll-TWs42om_VHaiB-elgUcAiXYtXAG_aQkWlNk3LOU9aBh5DlL9aFlvOwRWrtpNRejUEfFPGo_0QV70T9X-MMIKdrP3o_QuaKP0jZHA5_1K2W6GqvmcKiHrAsJMtQpiP1eVigA2s7F0MTSk42euG4LxJAGyFFlPMF7iJxQMHyHo1XgCyCGutNJ_HiOY9o4gtByiZR6QuZJvU5Y6rX5mAawMUC1-RssaEMv-MT-IIiyjQCajOIpkA4LGFQ62VK6mdCfL7yj4Qhl5n6g1mbC4OFbjBWxkSKNKO2RUCnk8xQcMH9MbRkAvrWdPZzIbtYUBCCa1dZ-drExl78migXUz1wP2JcgUY60ElOMJbvnEbZaCQhkrdDtB8nIeT5VnsxviVWXijHvTrpECsmmUz_8CkNR1PF2_vKcOgrWrEfuA5fkMsJjjrcTOBSyjhb72wsC-gz3ePvzdCt8FqfIp23hJ8vY5l7UZWcC08YDsUt3berv7NzkEeCdcN-aU0p70uozcuLagM0qnotjkQkkAAdHe6qX_mPGP2dt-AQyZa6CaQQ3HnOrAis1Fss-TkjtKLcp-7P7U4qS0tJyzmy6j9qqYV0xlJv3v27pIOwMCtrfesRKJeChezADjmPHsC1vZlhK_du6rfCrmgrYFcN5-NeJQ_1sP9qDeZPF3IEL0HGZ0QXT3PVmVxppyrXfje0ncf5CjVcxgvm-iElW09c";
            var originalGoogleResponse = "03AHJ_VutOYUFcoWQUhWf1NeioaQWCeat_27uUFDwz0RqFHYY9Kmbxz1WSSri2-mhwWh1u9XGlax7YE8cvTF1UJWd1w8uHEOdIrzembk3nSEQobDyq0katZDxguhKBYfzfSqYVVfNBwSmSxnsD22P3oOabhfjB2o6aIY8FGEOdOeKZvkQG3cLAD7rTp1DA8rZNfo5sklCZmpjpDz9TPUaBa5B56uf-1aW1J2jRjPRgMsqZeihhBhzZq_9beP9z_z247j9v1VyQStDMbYGUJ20xhYIENZkH1ITBpUk-498ewiZitavEV7tw4rLVzWV5RFkPPTurwkGyCwwLjv9g2yu4gvmcq5nWattidGJ93K1VMsWfeVcB8dPWB7hQWD0NIU8VRtNkeR2oSWFem0XxGaBkbnoBbwgL90eDA4jOr06EN7RTSVXWak85MeIXAGRyAQg3f9JeBBxpjei7IAL6aFwVqfB1KjoS8c30L066fYPZOAtSGWDqf2LJo93BRPWhq_6EQpBOPFPwZXoyjG-OsotJDwwPSyqnhAz0ErUwWOM5T1UKCMvJSNRAyy5TdLZPkccEFKaICzXvcfqI6UW5WeuTqEtAV3UcYY5gl90x8J00xToWu2BdK_x88tMdSf2Zg72yDq-nymyqtX-QFA9k6EEWUznsr8RMp3b1VSqWvAlGhTCWnfhUbqjwyo5Zsu14Clyk_TCRAtyzArj6bGKJVn7JTs2pKZTorsftcpaedUXaa6YijRGwkWRmYHMc1Sw-ZiD8ZuFwlXhreQkDvu5ODYMCxVeAMhk2ztv8_YlglAQZefrdK0ixKVHGn1YFjceKThvFc_zB4r6jL-3aUjLe6DEoc0lzGdgmnAOWnfoR3TP_XAA0TEPI4VFc6vEEWpB-XHN3eMom9rpgiCJr2G1VAw3PpgP2Cg635f_xj93PheSGDllSLgeaM3pWt8lSUI8o0CIFO_AQJ1URoV4G";
            var originalN = "U2FsdGVkX18zMTcwNTMxN0yit8sriwABzAoVARLT9H8mPaWGse6hVdiS8UjwDyhBe71IGOZI12sccFpwJvo0anovldisGAN5U9OqkeuclFnkN156xLuWNg";
            var columns = ['Title', 'Price', 'City', 'State', 'Phone'];
            var sheet = {name: 'result', data: []};
            sheet.data.push(columns);
            var rows = sheet.data;
            var city = context.cityName;
            var state = context.state;
            if (!fs.existsSync(city)) {
                fs.mkdirSync(city);
            }
            var notDone = [];
            var printToExcel = function () {
                var buffer = ew.build([sheet]);
                fs.writeFileSync(city + '/' + city + '_carLeads' + Date.now() + '.xlsx', buffer);
                console.log('Printed');
            }

            /** Single Req */
            function singleRequest(url) {
                var row = [];
                var options = {
                    method: 'GET',
                    uri: url,
                    headers: {},
                    gzip: true
                };
                return rp(options)
                    .then(function (body) {
                        var $ = cheerio.load(body);
                        //process html via cheerio
                        var urlToFetchPhone = prefix + $('#replylink').attr('href');
                        if (url.indexOf(context.cityName) == -1) {
                            urlToFetchPhone = 'https://' + url.split('/')[2] + $('#replylink').attr('href');
                        }
                        var title = $('#titletextonly').text();
                        var price = $('.price').text();
                        row.push(title);
                        row.push(price);
                        row.push(city);
                        row.push(state);
                        return new Promise(function (res, rej) {
                            setTimeout(function () {
                                res(urlToFetchPhone);
                            }, timeout);
                        });

                    }).then(function (phoneUrl) {
                        var options = {
                            method: 'POST',
                            uri: phoneUrl,
                            gzip: true,
                            headers: {
                                // "Accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
                                // "Accept-Encoding":"gzip, deflate, br",
                                // "Accept-Language":"en-US,en;q=0.8",
                                // "Cache-Control":"max-age=0",
                                // "Connection":"keep-alive",
                                // "Content-Type":"application/x-www-form-urlencoded",
                                // "Upgrade-Insecure-Requests":1,
                                "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36"

                            },
                            form: {
                                "n": originalN,
                                "g-recaptcha-response": originalGoogleResponse
                            }
                        };
                        return rp(options).then(function (body) {
                            var $ = cheerio.load(body);
                            var contactPanel = $('.reply-flap').length;
                            var phone = '';
                            if (contactPanel > 0) {
                                if ($('.reply-tel-link').length > 0) {
                                    phone = $('.reply-tel-link').eq(0).attr('href').match(/\d+/);
                                } else {
                                    console.log('this post has no phone');
                                    return false;
                                }
                            } else {
                                throw 'recapcha blocked me';
                            }
                            row.push(phone);
                            rows.push(row);
                            if (notDone.indexOf(url) != -1) {
                                notDone.remove(url);
                            }
                            console.log(phoneUrl + ' was done');
                        }).catch(function (err) {
                            console.log(phoneUrl + ' - not correct \r\n');
                            // console.log(err.message);
                            if (notDone.indexOf(url) == -1) {
                                notDone.push(url);
                            }
                        });
                    }).catch(function (err) {
                        //handle errors
                        if (notDone.indexOf(url) == -1) {
                            notDone.push(url);
                        }
                        console.log(err);
                    });
            }

            return Promise.map(detailsLinks, singleRequest, {concurrency: 3}).then(printToExcel).then(function () {
                fs.writeFileSync(city + '/notdone' + Date.now() + '.txt', JSON.stringify(notDone));
                return context;
            }).then(function (context) {
                fs.appendFileSync('CitiesDone.txt', context.cityName + '\r\n');
                return 0;
            });

        }).catch(function (err) {
            console.log(err);
        });
}
