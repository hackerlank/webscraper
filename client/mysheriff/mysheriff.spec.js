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

var captcha;
describe('input and take screen', function () {
    isAngularSite(false);
    var emailAddr = sTool.randomStr(8) + '@js.com';
    browser.get('http://www.mysheriff.net/users/').then(function () {
        element(by.xpath('//img[@src="http://www.mysheriff.net/verificationimage.php?"]')).getSize().then(function (size) {
            element(by.xpath('//img[@src="http://www.mysheriff.net/verificationimage.php?"]')).getLocation().then(function (location) {
                browser.takeScreenshot().then(function (data) {
                    var base64Data = data.replace(/^data:image\/png;base64,/, "");
                    fs.writeFile('vcode.png', base64Data, 'base64', function (err) {
                        if (err)
                            console.error(err);
                        easyimg.crop({
                            src: 'vcode.png',
                            dst: 'vcode.png',
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

    it('should have a title', function () {

        browser.driver.manage().timeouts().implicitlyWait(10000);
        // pTool.screenshot(browser, 'table.png');
        element(by.id('gender1')).click();
        element(by.name('firstname')).sendKeys('Jr');
        element(by.name('lastname')).sendKeys('Smith');
        element(by.name('email_address')).sendKeys(emailAddr);
        element(by.xpath('//form[@id="AddUser"]//input[@name="password"]')).sendKeys('123456');
        element(by.cssContainingText('option', 'Jan')).click();
        element(by.cssContainingText('option', '01')).click();
        element(by.cssContainingText('option', '1990')).click();
        element(by.name('City')).sendKeys('New Albany,Indiana').then(function () { console.log('City input') });

    }, 50000);


    it('write code to file', function () {

    });

    it('sign up', function () {
        tesseract.process('vcode.png', options, function (err, text) {
            captcha = text;
        });
    }, 50000);

    it('send code', function () {
        browser.wait(function () { return captcha }, 5000, 'captcha always undefined').then(function () {
            element(by.name('verif_box')).sendKeys(captcha).then(function () {
                console.log('captcha input ' + captcha)
                element(by.name('signUp')).click().then(function () {
                    console.log('sign Up Cliked');
                });
            });
        });
    }, 50000);

    it('check registered', function () {
        element(by.id('addNew')).isDisplayed().then(function (display) {
            if (display) {
                pTool.screenshot(browser, 'final.png');
                console.log(emailAddr);
            } else {
                console.log('failed');
            }
        });
    }, 50000);

    afterAll(function () {
        console.log(captcha);
        browser.quit();
    });

});