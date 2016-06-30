var scrapeIt = require("scrape-it");
var stringTool = require('../toolkits/stringtool');
var fs= require('fs');

/**
 * demo for scrape-it
 */

// scrapeIt("http://www.milanoo.com", {
//     //From url fetch text of tag 'title'(via jquery selector).
//     //If you want to collect specific data from the page, just use the same schema used for the data field.
//     //Other wise if you want to fetch a list, use the completed structure
//     /**
//      * listItem (String): The list item selector.
//      *   data (Object): The fields to include in the list objects:
//      *      <fieldName> (Object|String): The selector or an object containing:
//      *          selector (String): The selector.
//      *          convert (Function): An optional function to change the value.
//      *          how (Function|String): A function or function name to access the value.
//      *          attr (String): If provided, the value will be taken based on the attribute name.
//      *          trim (Boolean): If false, the value will not be trimmed (default: true).
//      *          eq (Number): If provided, it will select the nth element.
//      *          listItem (Object): An object, keeping the recursive schema of the listItem object. This can be used to create nested lists.
//      * 
//      */
//     Floors: {
//         listItem: '.sort_tit',
//         name : 'floors',
//         data : {
//             num : 'i',
//             full : ''
//         }
//     }, 
//     html : 'html'
// }).then(function (page) {
    
//     console.log(page);
// });

ScrapeIt(url, {
        content : 'html'
    }).then(function(page) {
        var r = stringTool.fetchAllMailAddress(page.content);
        if(r) {
            console.log('Email fetched ... ');
            fs.appendFileSync('email.txt', r + ' url is ' + url + '\r\n' , {encoding: 'utf-8'});
        }   
    });