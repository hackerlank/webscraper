// var d=  require('./timeFetcher.js');

// var offers = d("2016/08/09", "2016/08/10", "https://www.expedia.com.hk/en/Macau-Hotels-Altira-Macau.h10091860.Hotel-Information", "10091860");

// console.log(offers);

// /** to fetch t + n */
//                     dates.forEach(function (offset, index, array) {

//                         var params = urlComposer(offset);
//                         driver.get(hotel.baseUrl + params.params).then(function () {
//                             driver.wait(function () {
//                                 /** Waiting for form loaded */
//                                 return driver.isElementPresent(by.id('availability-check-in-label')).then(function (present) {
//                                     return present;
//                                 })
//                             }, 500000).then(function () {
//                                 driver.getPageSource().then(function (html) {
//                                     var $ = cheerio.load(html);
//                                     var price = $('tbody[data-room-code="' + roomTypeId + '"] tr .room-price').text() ? $('tbody[data-room-code="' + roomTypeId + '"] tr .room-price').text() : 'N/A';
//                                     row.push(price);
//                                     if (index === array.length - 1) {
//                                         rows.push(row);
//                                     }
//                                 });
//                             });
//                         });
//                     });
// var date = new Date("2016/08/10 08:00:00");

// console.log(date);