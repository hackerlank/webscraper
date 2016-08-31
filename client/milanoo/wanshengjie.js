/// <reference path="../../include.d.ts" />
var request = require('request');
var fs = require('fs');
var async = require('async');
var sTool = require('../../toolkits/stringtool.js');



/** 第一种情况， 有一个（品类的）浏览记录， 非男装非女装。  
 * 
 * 验证点 : 第一次要抽到type = 3,  第二次要抽到某种品类的赠品 第三次按概率来，均不能重复 
 * 
 * */
function situation1(mail, callback) {
    var regurl = 'http://192.168.11.67:8080/sp/member/memberRegister.htm?member.email=' + mail + '&member.userPass=123456&member.lang=en-uk';
    request({ url: regurl, gzip: true }, function (err, resp, body) {
        var memberId = JSON.parse(body).id;
        // fs.appendFileSync('resultreg.json', body);
        // console.log(memberId);
        /** 访问4116 商品 （非男装，非女装） */
        var browseUrl = 'http://192.168.11.67:8080/products/products/productDetails.htm?productId=4116&websiteId=1&languageCode=en-uk&deviceType=1&websiteIdLastView=1&memberId=' + memberId;
        request({ url: browseUrl, gzip: true }, function (err, resp, body) {

            /** 开始抽奖 */
            var drawUrl = 'http://192.168.11.67:8080/promotion/halloween/toLuckyDraw.htm?memberId=' + memberId + '&languageCode=en-uk&deviceType=1';
            request({ url: drawUrl, gzip: true }, function (err, resp, body1) {
                var type1 = JSON.parse(body1).awardType;
                var value1 = JSON.parse(body1).awardValue;

                // fs.appendFileSync('result.json', body1);
                // process.exit();

                // fs.appendFileSync('situation1.txt', '我是' + mail + ' memberID是 ' + memberId  + ' , 我浏览了4116， 第一次抽到type ' + type1 + ' , value为 ' + value1 + '\r\n');
                setTimeout(function () {


                    request({ url: drawUrl, gzip: true }, function (err, resp, body2) {
                        var type2 = JSON.parse(body2).awardType;
                        var value2 = JSON.parse(body2).awardValue;

                        setTimeout(function () {
                            request({ url: drawUrl, gzip: true }, function (err, resp, body3) {
                                var type3 = JSON.parse(body3).awardType;
                                var value3 = JSON.parse(body3).awardValue;
                                fs.appendFileSync('situation1_1.txt', '我是' + mail + ' memberID是 ' + memberId + ' , 我浏览了4116， 第一次抽到type ' + type1 + ' , 第二次抽到了type ' + type2 + ', 第三次抽到了type ' + type3 + '我的三次抽奖结果如下： \r\n');
                                fs.appendFileSync('situation1_1.txt', body1 + '\r\n');
                                fs.appendFileSync('situation1_1.txt', body2 + '\r\n');
                                fs.appendFileSync('situation1_1.txt', body3 + '\r\n');
                                setTimeout(function () {
                                    callback();
                                }, 50);
                            });
                        }, 2000);

                    });
                }, 2000);



            });
        });
    });
}

/** 第二种情况， 有一个（品类的）浏览记录，女装
 * 
 * 验证点 : 第一次要抽到type = 1,  第二次要抽到某种品类的赠品 第三次按概率来，均不能重复 
*/
function situation2(mail, callback) {
    var regurl = 'http://192.168.11.67:8080/sp/member/memberRegister.htm?member.email=' + mail + '&member.userPass=123456&member.lang=en-uk';
    request({ url: regurl, gzip: true }, function (err, resp, body) {
        var memberId = JSON.parse(body).id;
        // fs.appendFileSync('resultreg.json', body);
        // console.log(memberId);
        /** 访问74965 商品 女装 */
        var browseUrl = 'http://192.168.11.67:8080/products/products/productDetails.htm?productId=74965&websiteId=1&languageCode=en-uk&deviceType=1&websiteIdLastView=1&memberId=' + memberId;
        request({ url: browseUrl, gzip: true }, function (err, resp, body) {

            /** 开始抽奖 */
            var drawUrl = 'http://192.168.11.67:8080/promotion/halloween/toLuckyDraw.htm?memberId=' + memberId + '&languageCode=en-uk&deviceType=1';
            request({ url: drawUrl, gzip: true }, function (err, resp, body1) {
                var type1 = JSON.parse(body1).awardType;
                var value1 = JSON.parse(body1).awardValue;

                setTimeout(function () {
                    request({ url: drawUrl, gzip: true }, function (err, resp, body2) {
                        var type2 = JSON.parse(body2).awardType;
                        var value2 = JSON.parse(body2).awardValue;

                        setTimeout(function () {
                            request({ url: drawUrl, gzip: true }, function (err, resp, body3) {
                                var type3 = JSON.parse(body3).awardType;
                                var value3 = JSON.parse(body3).awardValue;
                                fs.appendFileSync('situation2_2.txt', '我是' + mail + ' memberID是 ' + memberId + ' , 我浏览了74965， 第一次抽到type ' + type1 + ' , 第二次抽到了type ' + type2 + ', 第三次抽到了type ' + type3 + '我的三次抽奖结果如下 ： \r\n');
                                fs.appendFileSync('situation2_2.txt', body1 + '\r\n');
                                fs.appendFileSync('situation2_2.txt', body2 + '\r\n');
                                fs.appendFileSync('situation2_2.txt', body3 + '\r\n');
                                setTimeout(function () {
                                    callback();
                                }, 200);
                            });
                        }, 1500);

                    });
                }, 1500);


            });
        });
    });
}

/** 第三种情况。 有两个（品类的）浏览记录，一个男装， 一个非男非女装 
 * 
 * 验证点 ： 两次抽奖分别是这两个品类
*/
function situation3(mail, callback) {
    var regurl = 'http://192.168.11.67:8080/sp/member/memberRegister.htm?member.email=' + mail + '&member.userPass=123456&member.lang=en-uk';
    request({ url: regurl, gzip: true }, function (err, resp, body) {
        var memberId = JSON.parse(body).id;
        // fs.appendFileSync('resultreg.json', body);
        // console.log(memberId);
        /** 访问74965 商品 女装 以及4116 非女装非男装 */
        var browseUrl1 = 'http://192.168.11.67:8080/products/products/productDetails.htm?productId=74965&websiteId=1&languageCode=en-uk&deviceType=1&websiteIdLastView=1&memberId=' + memberId;
        var browseUrl2 = 'http://192.168.11.67:8080/products/products/productDetails.htm?productId=4116&websiteId=1&languageCode=en-uk&deviceType=1&websiteIdLastView=1&memberId=' + memberId;

        request({ url: browseUrl1, gzip: true }, function (err, resp, body) {
            request({ url: browseUrl2, gzip: true }, function (err, resp, body) {

                /** 开始抽奖 */
                var drawUrl = 'http://192.168.11.67:8080/promotion/halloween/toLuckyDraw.htm?memberId=' + memberId + '&languageCode=en-uk&deviceType=1';
                setTimeout(function () {
                    request({ url: drawUrl, gzip: true }, function (err, resp, body1) {
                        var type1 = JSON.parse(body1).awardType;
                        var value1 = JSON.parse(body1).awardValue;

                        setTimeout(function () {
                            request({ url: drawUrl, gzip: true }, function (err, resp, body2) {
                                var type2 = JSON.parse(body2).awardType;
                                var value2 = JSON.parse(body2).awardValue;

                                fs.appendFileSync('situation3_1.txt', '我是' + mail + ' memberID是 ' + memberId + ' , 我浏览了4116和74965， 第一次抽到type ' + type1 + ' , 第二次抽到了type ' + type2 + ' 两次抽奖结果如下： \r\n');
                                fs.appendFileSync('situation3_1.txt', body1 + '\r\n');
                                fs.appendFileSync('situation3_1.txt', body2 + '\r\n');
                                setTimeout(function () {
                                    callback();
                                }, 500);
                            });
                        }, 1000);
                    });
                }, 1000);
            });
        });
    });
}

/** 第四种情况。 有三个（品类的）浏览记录，一个男装， 一个女装， 一个非男装非女装 
 * 
 * 验证点 ： 两次抽奖是三选二，随机选择
*/
function situation4(mail, callback) {
    var regurl = 'http://192.168.11.67:8080/sp/member/memberRegister.htm?member.email=' + mail + '&member.userPass=123456&member.lang=en-uk';
    request({ url: regurl, gzip: true }, function (err, resp, body) {
        var memberId = JSON.parse(body).id;
        // fs.appendFileSync('resultreg.json', body);
        // console.log(memberId);
        /** 访问 508133 男装 访问74965 商品 女装 以及4116 非女装非男装 */
        var browseUrl1 = 'http://192.168.11.67:8080/products/products/productDetails.htm?productId=508133&websiteId=1&languageCode=en-uk&deviceType=1&websiteIdLastView=1&memberId=' + memberId;
        var browseUrl2 = 'http://192.168.11.67:8080/products/products/productDetails.htm?productId=74965&websiteId=1&languageCode=en-uk&deviceType=1&websiteIdLastView=1&memberId=' + memberId;
        var browseUrl3 = 'http://192.168.11.67:8080/products/products/productDetails.htm?productId=4116&websiteId=1&languageCode=en-uk&deviceType=1&websiteIdLastView=1&memberId=' + memberId;

        request({ url: browseUrl1, gzip: true }, function (err, resp, body) {
            request({ url: browseUrl2, gzip: true }, function (err, resp, body) {
                request({ url: browseUrl3, gzip: true }, function (err, resp, body) {

                    /** 开始抽奖 */
                    var drawUrl = 'http://192.168.11.67:8080/promotion/halloween/toLuckyDraw.htm?memberId=' + memberId + '&languageCode=en-uk&deviceType=1';
                    setTimeout(function () {
                        request({ url: drawUrl, gzip: true }, function (err, resp, body1) {
                            var type1 = JSON.parse(body1).awardType;
                            var value1 = JSON.parse(body1).awardValue;

                            setTimeout(function () {
                                request({ url: drawUrl, gzip: true }, function (err, resp, body2) {
                                    var type2 = JSON.parse(body2).awardType;
                                    var value2 = JSON.parse(body2).awardValue;

                                    fs.appendFileSync('situation4_1.txt', '我是' + mail + ' memberID是 ' + memberId + ' , 我浏览了4116，74965以及508133， 第一次抽到type ' + type1 + ' , 第二次抽到了type ' + type2 + ' 两次抽奖结果如下： \r\n');
                                    fs.appendFileSync('situation4_1.txt', body1 + '\r\n');
                                    fs.appendFileSync('situation4_1.txt', body2 + '\r\n');
                                    setTimeout(function () {
                                        callback();
                                    }, 500);
                                });
                            }, 1000);
                        });
                    }, 1000);
                });
            });
        });
    });
}

/** 第五种情况 没有浏览记录
 * 
 * 验证点： 前两次商品（type=7）80%（也就是以前的耳机）  品类赠品20%(type=1,2,3)， 第三次按概率来。 不能重复
 */
function situation5(mail, callback) {
    var regurl = 'http://192.168.11.67:8080/sp/member/memberRegister.htm?member.email=' + mail + '&member.userPass=123456&member.lang=en-uk';
    request({ url: regurl, gzip: true }, function (err, resp, body) {
        var memberId = JSON.parse(body).id;

        /** 开始抽奖 */
        var drawUrl = 'http://192.168.11.67:8080/promotion/halloween/toLuckyDraw.htm?memberId=' + memberId + '&languageCode=en-uk&deviceType=1';
        request({ url: drawUrl, gzip: true }, function (err, resp, body1) {
            var type1 = JSON.parse(body1).awardType;
            var value1 = JSON.parse(body1).awardValue;

            // fs.appendFileSync('result.json', body1);
            // process.exit();

            // fs.appendFileSync('situation1.txt', '我是' + mail + ' memberID是 ' + memberId  + ' , 我浏览了4116， 第一次抽到type ' + type1 + ' , value为 ' + value1 + '\r\n');
            setTimeout(function () {


                request({ url: drawUrl, gzip: true }, function (err, resp, body2) {
                    var type2 = JSON.parse(body2).awardType;
                    var value2 = JSON.parse(body2).awardValue;

                    setTimeout(function () {
                        request({ url: drawUrl, gzip: true }, function (err, resp, body3) {
                            var type3 = JSON.parse(body3).awardType;
                            var value3 = JSON.parse(body3).awardValue;
                            fs.appendFileSync('situation5_2.txt', '我是' + mail + ' memberID是 ' + memberId + ' , 我什么都没浏览， 第一次抽到type ' + type1 + ' , 第二次抽到了type ' + type2 + ', 第三次抽到了type ' + type3 + '我的三次抽奖结果如下： \r\n');
                            fs.appendFileSync('situation5_2.txt', body1 + '\r\n');
                            fs.appendFileSync('situation5_2.txt', body2 + '\r\n');
                            fs.appendFileSync('situation5_2.txt', body3 + '\r\n');
                            setTimeout(function () {
                                callback();
                            }, 50);
                        });
                    }, 1000);

                });
            }, 1000);
        });
    });
}

/**
 * 第六种情况 随机抽4次奖 不能一样 哪怕中途加入浏览记录
 */
function situation6(mail, callback) {
    var regurl = 'http://192.168.11.67:8080/sp/member/memberRegister.htm?member.email=' + mail + '&member.userPass=123456&member.lang=en-uk';
    request({ url: regurl, gzip: true }, function (err, resp, body) {
        var memberId = JSON.parse(body).id;
        var shareUrl = "http://192.168.11.67:8080/promotion/anniversary/saveShare.htm?memberId=" + memberId;

        request({ url: shareUrl, gzip: true }, function (err, resp, body) {
            /** 开始抽奖 */
            var drawUrl = 'http://192.168.11.67:8080/promotion/halloween/toLuckyDraw.htm?memberId=' + memberId + '&languageCode=en-uk&deviceType=1';
            request({ url: drawUrl, gzip: true }, function (err, resp, body1) {
                var type1 = JSON.parse(body1).awardType;
                var value1 = JSON.parse(body1).awardValue;

                // fs.appendFileSync('result.json', body1);
                // process.exit();

                var browseUrl = 'http://192.168.11.67:8080/products/products/productDetails.htm?productId=74965&websiteId=1&languageCode=en-uk&deviceType=1&websiteIdLastView=1&memberId=' + memberId;
                request({ url: browseUrl, gzip: true }, function (err, resp, body) {
                    // fs.appendFileSync('situation1.txt', '我是' + mail + ' memberID是 ' + memberId  + ' , 我浏览了4116， 第一次抽到type ' + type1 + ' , value为 ' + value1 + '\r\n');
                    setTimeout(function () {


                        request({ url: drawUrl, gzip: true }, function (err, resp, body2) {
                            var type2 = JSON.parse(body2).awardType;
                            var value2 = JSON.parse(body2).awardValue;
                            if (type2 == type1) {
                                console.log(memberId + " : " + type2 + " ?= " + type1);
                            }

                            setTimeout(function () {
                                request({ url: drawUrl, gzip: true }, function (err, resp, body3) {
                                    var type3 = JSON.parse(body3).awardType;
                                    if ((type3 == type1) || (type3 == type2)) {
                                        console.log(memberId + " : " + type3 + " ?= " + type1);
                                        console.log(memberId + " : " + type3 + " ?= " + type2);
                                    }
                                    var value3 = JSON.parse(body3).awardValue;
                                    setTimeout(function () {
                                        request({ url: drawUrl, gzip: true }, function (err, resp, body4) {
                                            var type4 = JSON.parse(body4).awardType;
                                            if ((type4 == type1) || (type4 == type2) || (type4 == type3)) {
                                                console.log(memberId + " : " + type4 + " ?= " + type1);
                                                console.log(memberId + " : " + type4 + " ?= " + type2);
                                                console.log(memberId + " : " + type4 + " ?= " + type3);
                                            }

                                            fs.appendFileSync('type4.txt', type4 + ' : ' + memberId +  '\r\n');
                                        });
                                    }, 1000);
                                    setTimeout(function () {
                                        callback();
                                    }, 50);
                                });
                            }, 1000);

                        });
                    }, 1000);
                });
            });
        });
    });
}


var emails = [];

for (var i = 0; i < 500; i++) {
    (function (i) {
        var mail = sTool.randomStr(8) + '@milanoo.com';
        emails.push(mail);
    } (i));
}

async.mapLimit(emails, 15, function (mail, callback) {
    // situation1(mail, callback);
    // situation2(mail, callback);
    situation2(mail, callback);
}, function (err) {
    if (err) console.log(err);
    console.log('All 500 users have done their job');
});

// var ids = [499451,85982,202666,35688,85882,33763,69465,551885,202622,73286,551883,202654,432877,551889,202606,432873,78541,202614,432875,78547,432881,85948,432863,432869,432885];

// async.mapLimit(ids, 5, function (id, callback) {
//     var url = "http://192.168.11.67:8080/products/products/productDetails.htm?productId=" + id + "&websiteId=1&languageCode=en-uk&deviceType=1&websiteIdLastView=1&memberId=3773613";

//     request({ url: url, gzip: true }, function (err, resp, body) {
//         var r = JSON.parse(body);
//         if(!r.productDetails.limitNum || r.productDetails.limitNum !== 1) {
//             console.log(id);
//         }
//         callback();
//     });
// });