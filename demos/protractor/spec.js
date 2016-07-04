/// <reference path="../../include.d.ts" />

var fs = require('fs');
var pTool = require('../../toolkits/protractortool');
var Excel = require('../../private/ExcelWriter.js');

describe('Protractor Demo App', function () {
  var excel = new Excel('result.xlsx', ['Column1', 'Column2', 'Column3', 'Column4', 'Column5', 'Column6', 'Column7'], 'scraped')
  beforeEach(function () {
    return isAngularSite(false);
  });

  it('should have a title', function () {
    browser.get('https://procure.az.gov/bso/external/publicBids.sdo');
    // pTool.screenshot(browser, 'table.png');

    element.all(by.xpath('//table[@id="resultsTable"]/tbody/tr')).each(function (tr, rowsIndex) {
      var row = [];
      tr.all(by.xpath('./td')).each(function (td, cellsIndex) {
        if (cellsIndex === 0) {
          fs.appendFileSync('result.sql', 'insert into table results values(');
        }
        td.isElementPresent(by.xpath('./a')).then(function (present) {
          if (present) {
            td.element(by.xpath('./a')).getText().then(function (text) {
              row.push(text);
              fs.appendFile('result.sql', '"' + text + '"', function (err) {
                tr.all(by.xpath('./td')).count().then(function (count) {
                  if (cellsIndex < count - 1) {
                    fs.appendFileSync('result.sql', ',');
                  }
                });
              });
            });
          } else {
            td.getText().then(function (text) {
              row.push(text);
              fs.appendFile('result.sql', '"' + text + '"', function (err) {
                tr.all(by.xpath('./td')).count().then(function (count) {
                  if (cellsIndex < count - 1) {
                    fs.appendFileSync('result.sql', ',');
                  }
                });
              });
            });
          }
        });
        tr.all(by.xpath('./td')).count().then(function (count) {
          if (count == cellsIndex + 1) {
            excel.appendRow(row);
            row = [];
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

  }, 2 * 60 * 60 * 1000);

  it('build excel', function() {
        // excel.log();
        excel.build();
    },5000);
});