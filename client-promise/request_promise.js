/// <reference path="../include.d.ts" />

const Promise = require('bluebird');
const request = require('request');
const requestAsync = Promise.promisify(request); // This is what bluebird saves you
const fs = require('fs');
// requestAsync returns a promise instead of accepting a callback.

const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
var url = 'http://www.baidu.com/';

const requestSingle = number =>
    requestAsync(`${url}${number}`).
        then(response => {
            console.log(number + ' is running');
            // fs.writeFileSync(number + '.html', JSON.stringify(response.body));
        }).then(() => {
            return new Promise(function (res, rej) {
                setTimeout(function () {
                    res(number);
                }, 2000);
            });
            // return setTimeout(function() {
            //     return Promise.resolve(number);
            // }, 2000);
            // requestAsync.resolve()

        }).then(number => {
            console.log(number);
        }).catch(err => {
            console.log(err + ' - ERROR');
        })


Promise.map(array, requestSingle, { concurrency: 3 }).then(result => {
    console.log('all done');
});


// const arrayOfRequestPromises = array.map(requestSingle);

// Promise.all(arrayOfRequestPromises)
//     .then(allResults => {
//     })
//     .catch(err => {
//         // handle errors
//     });