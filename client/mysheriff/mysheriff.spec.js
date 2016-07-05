/// <reference path="../../include.d.ts" />

var fs = require('fs');
var pTool = require('../../toolkits/protractortool');
var sTool = require('../../toolkits/stringtool');
var async = require('async');

var tesseract = require('node-tesseract');
var easyimg = require('easyimage');

// var options = { l: 'eng', psm: 3 };
var options = {};

var cropInFile = function (size, location, srcFile) {
    console.log('start cut');

};

describe('Auto register', function () {
    var captcha;
    isAngularSite(false);
    var emailAddr = sTool.randomStr(8) + '@js.com';
    browser.get('http://www.mysheriff.net/users/').then(function () {
        browser.manage().timeouts().implicitlyWait(100000);
        pTool.screenshot(browser, 'screens/form.png');
        element(by.xpath('//img[@src="http://www.mysheriff.net/verificationimage.php?"]')).getSize().then(function (size) {
            element(by.xpath('//img[@src="http://www.mysheriff.net/verificationimage.php?"]')).getLocation().then(function (location) {
                browser.takeScreenshot().then(function (data) {
                    var base64Data = data.replace(/^data:image\/png;base64,/, "");
                    fs.writeFile('captchas/' + emailAddr + '.png', base64Data, 'base64', function (err) {
                        if (err)
                            console.error(err);
                        easyimg.crop({
                            src: 'captchas/' + emailAddr + '.png',
                            dst: 'captchas/' + emailAddr + '.png',
                            cropwidth: size.width,
                            cropheight: size.height,
                            x: location.x,
                            y: location.y,
                            gravity: 'North-West'
                        },
                            function (err, stdout, stderr) {
                                if (err) throw err;
                            });
                    });

                });
            });
        });
    });

    it('Register', function () {
        // pTool.screenshot(browser, 'table.png');
        element(by.id('gender1')).click();
        element(by.name('firstname')).sendKeys('Jr');
        element(by.name('lastname')).sendKeys('Smith');
        element(by.name('email_address')).sendKeys(emailAddr);
        element(by.xpath('//form[@id="AddUser"]//input[@name="password"]')).sendKeys('123456');
        element(by.cssContainingText('option', 'Jan')).click();
        element(by.cssContainingText('option', '01')).click();
        element(by.cssContainingText('option', '1990')).click();
        element(by.name('City')).sendKeys('N').then(function () {
            element(by.xpath("//div[@class='ac_results']/ul/li")).click();
        });

    }, 50000);


    it('sign up', function () {
        tesseract.process('captchas/' + emailAddr + '.png', options, function (err, text) {
            captcha = text;
        });
    }, 50000);

    it('send code', function () {
        browser.wait(function () { return captcha; }, 5000, 'captcha always undefined').then(function () {
            element(by.name('verif_box')).sendKeys(sTool.fetchNumbersFromString(captcha, 4) ? sTool.fetchNumbersFromString(captcha, 4) : captcha).then(function () {
                console.log('captcha input ' + sTool.fetchNumbersFromString(captcha, 4) ? sTool.fetchNumbersFromString(captcha, 4) : captcha);
            });
        });
    }, 50000);

    it('check registered', function () {
        pTool.screenshot(browser, 'final.png');
        browser.wait(function () { return element(by.name('signUp')).isDisplayed(); }, 10000).then(function () {
            element(by.name('signUp')).click().then(function () {
                console.log('sign Up Cliked');
                // element(by.xpath("//b[text()='My Business']")).isPresent().then(function (present) {
                //     if (present) {
                //         // pTool.screenshot(browser, 'final.png');
                //         console.log(emailAddr);
                //     } else {
                //         // pTool.screenshot(browser, 'final.png');
                //         console.log('failed');
                //     }
                // });
            });
        });

    }, 50000);

    it('save email', function () {
        fs.appendFileSync('emails.txt', emailAddr + '\r\n');
    }, 50000);

    afterAll(function () {
        console.log(captcha);
        browser.quit();
    });

}, 2 * 60 * 60 * 1000);
