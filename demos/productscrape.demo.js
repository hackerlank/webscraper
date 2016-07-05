/// <reference path="../include.d.ts" />

var scraper = require('scraperjs');

scraper.StaticScraper.create('http://www.milanoo.com/Buy-Women-S-Dresses-c1324')
    .scrape(function($) {
        return $(".proItem .goods_name a span").map(function() {
            return $(this).text();
        }).get();
    })
    .then(function(news) {
        console.log(news);
    })
