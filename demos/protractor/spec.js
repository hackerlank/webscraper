/// <reference path="../../include.d.ts" />

var fs = require('fs');
var pTool = require('../../toolkits/protractortool');

describe('Protractor Demo App', function () {

  beforeEach(function () {
    return isAngularSite(false);
  });

  it('should have a title', function () {
    browser.get('https://procure.az.gov/bso/external/publicBids.sdo');
    // pTool.screenshot(browser, 'table.png');

    element.all(by.xpath('//table[@id="resultsTable"]/tbody/tr')).each(function (tr, index) {
      tr.all(by.xpath('./td')).each(function (td, index) {
        if(index === 0) {
          fs.appendFileSync('result.sql', 'insert into table results values(');
        }
        td.isElementPresent(by.xpath('./a')).then(function (present) {
          if (present) {
            td.element(by.xpath('./a')).getText().then(function (text) {
              fs.appendFileSync('result.sql', '"' + text + '",');
            });
          } else {
            td.getText().then(function (text) {
              fs.appendFileSync('result.sql', '"' + text + '",');
            });
          }
        });
        tr.all(by.xpath('./td')).count().then(function(count) {
            if(count == index + 1) {
              fs.appendFileSync('result.sql', ')\r\n');
            }
        });
      });
    });

    //   var lines = element.all(by.xpath('//table[@id="resultsTable"]/tbody/tr'));
    //   for (var i = 0; i < lines.getSize(); i++) {
    //     fs.writeFileSync('result.sql', 'insert into table results values(');
    //     var currentLine = lines.get(i);
    //     var cells = currentLine.all(by.xpath("./td/a"));
    //     for (var j = 0; j < cells.getSize(); j++) {
    //       var text = cells.get(j).getText();
    //       fs.appendFileSync('result.sql', '"' + text + '"')
    //       if (j !== cells.getSize() - 1) {
    //         fs.appendFileSync(sPath + 'result.sql', ',');
    //       } else {
    //         fs.appendFileSync(sPath + 'result.sql', ')');
    //       }
    //     }
    //   }

    // });

  });
});