var ScrapeIt = require('scrape-it');
var fs = require('fs');

// ScrapeIt('http://www.teaconnect.org/Members/Member-Directory/index.cfm?start=1&end=4256&searchTerm=&search=people&searchtype=people&alpha=', {
//     listItem : 'webSearchResult',
//     data : {
//         Name: "div[class='personProfile'] h1",
//         Email: "div[class='personProfile'] p span(1)",
//         Company: "div[class='personProfile'] p strong",
//         JobTitle: "div[class='personProfile'] span strong"
//     }
// }).then(function (page) {

    

// });

ScrapeIt('http://www.teaconnect.org/Members/Member-Directory/index.cfm?start=1&end=4256&searchTerm=&search=people&searchtype=people&alpha=', {
        listItem: '#mainCol',

        data : {
            selector : '.webSearchResult h5 a',
            attr : 'href'
        }        
}).then(function(page) {
    console.log(page);
    fs.writeFile('page.txt', page);
});