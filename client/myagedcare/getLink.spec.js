/// <reference path="../../include.d.ts" />

var fs = require('fs');
var pTool = require('../../toolkits/protractortool');
var Excel = require('../../private/ExcelWriter.js');

var tb = ["http://www.myagedcare.gov.au/service-finder?tab=help-at-home&view=list&name=Australia&service=Allied Health and Therapy Services","http://www.myagedcare.gov.au/service-finder?tab=help-at-home&view=list&name=Australia&service=Assistance with Care and Housing","http://www.myagedcare.gov.au/service-finder?tab=help-at-home&view=list&name=Australia&service=Centre-based Respite","http://www.myagedcare.gov.au/service-finder?tab=help-at-home&view=list&name=Australia&service=Cottage Respite","http://www.myagedcare.gov.au/service-finder?tab=help-at-home&view=list&name=Australia&service=Domestic Assistance","http://www.myagedcare.gov.au/service-finder?tab=help-at-home&view=list&name=Australia&service=Flexible Respite","http://www.myagedcare.gov.au/service-finder?tab=help-at-home&view=list&name=Australia&service=Goods, equipment and assistive technology","http://www.myagedcare.gov.au/service-finder?tab=help-at-home&view=list&name=Australia&service=Home maintenance","http://www.myagedcare.gov.au/service-finder?tab=help-at-home&view=list&name=Australia&service=Home modifications","http://www.myagedcare.gov.au/service-finder?tab=help-at-home&view=list&name=Australia&service=Meals","http://www.myagedcare.gov.au/service-finder?tab=help-at-home&view=list&name=Australia&service=National ATSI Aged Care Program","http://www.myagedcare.gov.au/service-finder?tab=help-at-home&view=list&name=Australia&service=Nursing","http://www.myagedcare.gov.au/service-finder?tab=help-at-home&view=list&name=Australia&service=Other Food Services","http://www.myagedcare.gov.au/service-finder?tab=help-at-home&view=list&name=Australia&service=Personal Care","http://www.myagedcare.gov.au/service-finder?tab=help-at-home&view=list&name=Australia&service=Social Support Group","http://www.myagedcare.gov.au/service-finder?tab=help-at-home&view=list&name=Australia&service=Social Support Individual","http://www.myagedcare.gov.au/service-finder?tab=help-at-home&view=list&name=Australia&service=Specialised Support Services", "http://www.myagedcare.gov.au/service-finder?tab=help-at-home&view=list&name=Australia&service=Transition Care", "http://www.myagedcare.gov.au/service-finder?tab=help-at-home&view=list&name=Australia&service=Transport"]

describe('Protractor Demo App', function () {
    fs.appendFileSync('linkList.txt', '');
    var excel = new Excel('Permanent.xlsx', ['Age Care Name', 'Street Address', 'Business Address', 'Phone Number', 'Email ID', 'Website'], 'scraped')
    beforeEach(function () {
        return isAngularSite(true);
    });

    it('should have a title', function () {
        for(var i in tb) {
        browser.get(tb[i]);
        // browser.get('http://www.myagedcare.gov.au/service-finder?tab=aged-care-homes&view=list&keyword=Australia&service=Residential%20Respite%20Low%20Care');
        // browser.get('http://www.myagedcare.gov.au/service-finder?tab=aged-care-homes&view=list&keyword=Australia&service=Residential%20Permanent');
        // browser.get('http://www.myagedcare.gov.au/service-finder?tab=aged-care-homes&view=list&keyword=Australia&service=Residential%20Permanent');
        //Name
        browser.sleep(20000).then(function(){
        // browser.wait(function () { return false }, 20000, 'waited').then(function () {
            browser.switchTo().frame(browser.driver.findElement(by.xpath('//iframe[@id="content"]')));
            element.all(by.xpath("//td[@id='name']/a")).each(function (a, index) {
                a.getAttribute('href').then(function (href) {
                    console.log(href);
                    fs.appendFileSync('linkList.txt', href + '\r\n');
                });
            });
        });
    }
    }, 2 * 60 * 60 * 1000);

    it('build excel', function () {
        // excel.build();
    }, 5000);
});