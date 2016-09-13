/// <reference path="../../include.d.ts" />


var request = require('request');
var sTool = require('../../toolkits/stringtool.js');
var fs = require('fs');
var cheerio = require('cheerio');
var async = require('async');
var ew = require('node-xlsx');




var columns = ["name", "phone", "twitter", "address", "lat", "lng", "neighborhood", "city", "state", "country", "canonicalUrl", "category", "checkinsCount", "usersCount", "tipCount", "visitsCount", "url", "tier", "message", "currency", "rating", "seachedBy"];

var sheet = { name: 'result', data: [] };

sheet.data.push(columns);

var rows = sheet.data;

var cookie = '';

var headers = {
    Cookie: cookie
}
var cities = ["New York", "Los Angeles", "Chicago", "Washington", "San Francisco", "Boston", "Dallas", "Philadelphia", "Houston", "Miami", "Atlanta", "Detroit", "Seattle", "Phoenix", "Minneapolis", "Cleveland", "Denver", "San Diego", "Orlando", "Portland", "Tampa", "St. Louis", "Pittsburgh", "Charlotte", "Sacramento", "Salt Lake City", "Kansas City", "Columbus", "Indianapolis", "San Antonio", "Las Vegas", "Cincinnati", "Raleigh", "Milwaukee", "Austin", "Nashville", "Virginia Beach", "Greensboro", "Providence", "Jacksonville", "Hartford", "Louisville", "New Orleans", "Grand Rapids", "Greenville", "Memphis", "Oklahoma City", "Birmingham", "Richmond", "Harrisburg", "Buffalo", "Rochester", "Albany", "Albuquerque", "Tulsa", "Fresno", "Knoxville", "Dayton", "El Paso", "Tucson", "Cape Coral", "Honolulu", "Chattanooga", "Bridgeport", "Worcester", "Omaha", "North Port", "Columbia", "Little Rock", "McAllen", "New Haven", "Bakersfield", "Madison", "Oxnard", "Allentown", "Baton Rouge", "Modesto", "Des Moines", "Syracuse", "South Bend", "Boise", "Charleston", "Lexington", "Stockton", "Akron", "Charleston", "Springfield", "Huntsville", "Spokane", "Wichita", "Jackson", "Colorado Springs", "Youngstown", "Toledo", "Winston-Salem", "Portland", "Fort Wayne", "Lakeland", "Ogden", "Lafayette", "Mobile", "Visalia", "Deltona", "Reno", "Augusta", "Scranton", "Provo", "Palm Bay", "Fayetteville", "Lansing", "Springfield", "Lancaster", "Kalamazoo", "Durham", "Corpus Christi", "Savannah", "Johnson City", "Columbus", "Santa Rosa", "Fayetteville", "Davenport", "Asheville", "Pensacola", "Myrtle Beach", "Shreveport", "Rockford", "York", "Brownsville", "Port St. Lucie", "Santa Maria", "Gulfport", "Salinas", "Vallejo", "Killeen", "Cedar Rapids", "Flint", "Macon", "Peoria", "Reading", "Hickory", "Beaumont", "Canton, Ohio", "Manchester", "Tallahassee", "Appleton", "Salem", "Anchorage", "Saginaw", "Salisbury", "Montgomery", "Trenton", "Erie", "Huntington", "Green Bay", "Eugene", "Ann Arbor", "Gainesville", "Ocala", "Naples", "Lincoln", "Lubbock", "Springfield", "Spartanburg", "Evansville", "Fort Collins", "Roanoke", "Kingsport", "Rocky Mount", "Wausau", "Boulder", "Utica", "Midland", "Medford", "Longview", "Fort Smith", "Amarillo", "Duluth", "Atlantic City", "San Luis Obispo", "Clarksville", "Norwich", "Kennewick", "Santa Cruz", "Tyler", "Bloomsburg", "Greeley", "Wilmington", "Merced", "Laredo", "Olympia", "Waco", "Hagerstown", "Lynchburg", "Bremerton", "Monroe", "Dothan", "Rochester", "Binghamton", "Crestview", "Harrisonburg", "Harrisonburg", "Yakima", "Redding", "Lafayette", "Fargo", "Sioux Falls", "State College", "Topeka", "College Station", "Champaign", "Tuscaloosa", "Idaho Falls", "Bloomington", "Charlottesville", "Chico", "Lima", "Greenville", "Columbia", "Johnstown", "Mansfield", "Claremont", "Barnstable", "Bowling Green", "Las Cruces", "Burlington", "Prescott", "Houma", "Bloomington", "Eau Claire", "Pueblo", "Joplin", "Florence", "Bellingham", "Lake Havasu City", "Lake Charles", "Yuma", "Elkhart", "Athens", "New Bern", "Racine", "Hilton Head Island", "Morgantown", "Daphne", "St. Cloud", "Hilo", "Elmira", "Panama City", "Torrington", "Warner Robins", "Gainesville", "Jacksonville", "Sioux City", "Bend", "Kingston", "Blacksburg", "El Centro", "Terre Haute", "Muskegon", "East Stroudsburg", "Oshkosh", "Waterloo", "Yuba City", "Dover", "Jonesboro", "Abilene", "Rapid City", "Billings", "Punta Gorda", "Janesville", "Jackson", "Kahului", "Iowa City", "Vineland", "Albany", "Williamsport", "Niles", "Alexandria", "Decatur", "Parkersburg", "Burlington", "Bangor", "Ottawa", "Madera", "Ithaca", "Hanford", "Chambersburg", "Monroe", "Wichita Falls", "Elizabethtown", "Jefferson City", "Texarkana", "Grand Junction", "Auburn", "Pottsville", "Florence", "Hattiesburg", "Concord", "Wheeling", "Santa Fe", "Traverse City", "St. George", "Valdosta", "Odessa", "Dalton", "Coeur d'Alene", "Sebastian", "Homosassa Springs", "Napa", "Tupelo", "Springfield", "Cape Girardeau", "Paducah", "Flagstaff", "Manhattan", "Lumberton", "La Crosse", "Lebanon", "Battle Creek", "Eureka", "Jamestown", "Lawton", "Sierra Vista", "Findlay", "Winchester", "Jackson", "Hot Springs", "Pittsfield", "Farmington", "Glens Falls", "Logan", "St. Joseph", "Altoona", "Carbondale", "London", "Edwards", "Beckley", "Goldsboro", "Mankato", "Hammond", "Weirton", "Dunn", "Sherman", "Rome", "Augusta", "Watertown", "Bismarck", "Kokomo", "Staunton", "Albany", "Victoria", "Mount Vernon", "Cleveland", "Muncie", "Anniston", "Quincy", "Owensboro", "Sheboygan", "Morristown", "San Angelo", "Wooster", "Brunswick", "Kankakee", "Wenatchee", "Lawrence", "Mount Pleasant", "Ogdensburg", "Holland", "Michigan City", "Missoula", "Moses Lake", "Decatur", "California", "Sumter", "Lewiston", "Roseburg", "Meridian", "Show Low", "Bay City", "Cookeville", "Bluefield", "Salem", "Danville", "Gadsden", "Whitewater", "Longview", "Cumberland", "Fond du Lac", "Richmond", "The Villages", "Gettysburg", "Twin Falls", "Ashtabula", "Tullahoma", "Fairbanks", "Corning", "Adrian", "Grand Forks", "Truckee", "Sebring", "Shelby", "Pine Bluff", "Ocean City", "Dubuque", "Greenwood", "Albertville", "Cheyenne", "Sunbury", "Clarksburg", "Dixon", "Talladega", "Bozeman", "Sevierville", "New Philadelphia", "Richmond", "Kalispell", "Orangeburg", "Brainerd", "Ames", "Pinehurst", "DeRidder", "New Castle", "Beaver Dam", "Indiana", "Hermiston", "Meadville", "Lufkin", "Ukiah", "Corvallis", "Zanesville", "Laurel", "Pullman", "Russellville", "Branson", "Watertown", "Midland", "Pocatello", "Opelousas", "Grand Island", "Grants Pass", "Huntsville", "Wilson", "Great Falls", "Plattsburgh", "Hinesville", "DuBois", "Danville", "Manitowoc", "Cullman", "Auburn", "Olean", "Oak Harbor", "Columbus", "Athens", "Casper", "Searcy", "Portsmouth", "Stillwater", "Warsaw", "Chillicothe", "Somerset", "Keene", "Sandusky", "Helena", "Centralia", "Roanoke Rapids", "Key West", "Seneca", "Wisconsin Rapids", "Glenwood Springs", "Mount Airy", "Palatka", "Minot", "Gallup", "Statesboro", "Martin", "Port Angeles", "Aberdeen", "Greenfield", "Frankfort", "Shawnee", "Muskogee", "Stevens Point", "Clovis", "Marion", "North Wilkesboro", "Owosso", "Greeneville", "LaGrange", "Kapaa", "Lake City", "Marquette", "Morehead City", "Marshall", "Forest City", "Martinsville", "Hobbs", "Marion", "Alamogordo", "Nacogdoches", "Farmington", "Klamath Falls", "Roswell", "Marinette", "Faribault", "Charleston", "Hutchinson", "Athens", "Elizabeth City", "Clearlake", "Ionia", "Somerset", "Red Bluff", "Walla Walla", "Sayre", "Baraboo", "Coos Bay", "Hudson", "Cleveland", "Salina", "Oneonta", "Rio Grande City", "Fort Madison", "Marietta", "Lewiston", "Enid", "Rutland", "Shelton", "Sturgis", "Mount Vernon", "Big Stone Gap", "Albemarle", "Jefferson", "Fremont", "Oxford", "Laconia", "Georgetown", "Batavia", "Sanford", "Columbus", "Barre", "Norwalk", "Kinston", "Palestine", "Dublin", "Point Pleasant", "Sterling", "Vicksburg", "Fergus Falls", "Crossville", "Fairmont", "Tiffin", "Calhoun", "Gaffney", "Eagle Pass", "Milledgeville", "Picayune", "Gloversville", "Carson City", "Jasper", "Waycross", "Carlsbad", "Warrensburg", "Oil City", "Sonora", "Kearney", "Fort Polk South", "Morgan City", "Ontario", "Fort Leonard Wood", "Elko", "Payson", "Danville", "McComb", "Scottsboro", "Ashland", "Rochelle", "Glasgow", "Greenville", "Natchez", "Athens", "Durango", "Galesburg", "Boone", "Malone", "Bartlesville", "Winona", "St. Marys", "Fernley", "Mason City", "Enterprise", "Jacksonville", "Platteville", "Ozark", "Rexburg", "Amsterdam", "Paris", "Kerrville", "Greenville", "Oxford", "Cortland", "New Castle", "Sidney", "Clinton", "Del Rio", "Norfolk", "Starkville", "Tahlequah", "Ardmore", "Corsicana", "Gillette", "Cadillac", "Kendallville", "Washington", "Burlington", "Nogales", "Plymouth", "Gardnerville Ranchos", "Freeport", "Ruston", "Cañon City", "Lewistown", "Cedar City", "Madisonville", "Bogalusa", "Rockingham", "Red Wing", "Hillsdale", "Newport", "Moultrie", "Bedford", "Shawano", "Huntingdon", "Ponca City", "Wapakoneta", "Shelbyville", "Blytheville", "Bellefontaine", "Blackfoot", "Harrison", "Bemidji", "Rock Springs", "Henderson", "McAlester", "Marion", "Rolla", "Lewisburg", "Mount Sterling", "Duncan", "Thomasville", "Bardstown", "Menomonie", "Ottumwa", "Coldwater", "Cornelia", "Durant", "Big Rapids", "Burley", "Douglas", "Paragould", "Bradford", "Seymour", "Poplar Bluff", "Pahrump", "Muscatine", "Selma", "Bucyrus", "Willmar", "Auburn", "Sedalia", "Lawrenceburg", "Alma", "Wilmington", "Alice", "Ellensburg", "Greenwood", "Aberdeen", "Port Clinton", "El Campo", "Cedartown", "Garden City", "Warren", "Riverton", "Tifton", "Mountain Home", "Celina", "El Dorado", "Marshalltown", "Montrose", "West Plains", "Jacksonville", "Sandpoint", "Cullowhee", "Española", "McMinnville", "Cambridge", "Selinsgrove", "Urbana", "Lock Haven", "Okeechobee", "Natchitoches", "Austin", "Pittsburg", "Stephenville", "Sikeston", "Scottsbluff", "Hannibal", "Sault Ste. Marie", "Kill Devil Hills", "Centralia", "Houghton", "Mount Vernon", "Gainesville", "Defiance", "Pontiac", "Logansport", "Berlin", "Dyersburg", "Crawfordsville", "Moscow", "Vincennes", "Easton", "Junction City", "Summit Park", "Ada", "Union City", "Brownwood", "Murray", "Newberry", "Mayfield", "Clewiston", "Safford", "North Platte", "Astoria", "Laramie", "Fort Dodge", "Corinth", "Batesville", "Huntington", "Escanaba", "Coshocton", "Bennington", "Big Spring", "Canton", "Newton", "Bay City", "Americus", "Steamboat Springs", "Peru", "Fremont", "Alexandria", "Plainview", "Owatonna", "Arkansas City", "Vidalia", "Logan", "Laurinburg", "Hutchinson", "Newport", "Sulphur Springs", "Lebanon", "Seneca Falls", "Brookhaven", "Dodge City", "Arcadia", "Taylorville", "Vernal", "Coffeyville", "Butte", "Decatur", "Effingham", "Angola", "Brenham", "Valley", "Emporia", "Susanville", "Malvern", "Troy", "Frankfort", "Jackson", "Brevard", "Taos", "Columbus", "Mount Pleasant", "Brookings", "Juneau", "Madison", "Cambridge", "Macomb", "Beeville", "Kingsville", "Wabash", "Paris", "Dayton", "Miami", "Washington", "Kennett", "Jackson", "Hastings", "Albert Lea", "Lewisburg", "Camden", "Iron Mountain", "Jesup", "Lincoln", "Kirksville", "Sheridan", "Silver City", "Elkins", "McPherson", "Alpena", "Hays", "Las Vegas", "Washington Court House", "Van Wert", "Ludington", "Weatherford", "Fort Morgan", "Indianola", "Merrill", "Crescent City", "Middlesborough", "North Vernon", "Bennettsville", "Breckenridge", "Forrest City", "Mineral Wells", "Watertown", "Bastrop", "Great Bend", "Wauchula", "Bainbridge", "Hailey", "Grants", "Dickinson", "Uvalde", "Williston", "Thomaston", "Lexington", "Altus", "Mountain Home", "Boone", "Greensburg", "Ottawa", "Toccoa", "La Grande", "Summerville", "Clarksdale", "Mexico", "Marshall", "The Dalles", "New Ulm", "Moberly", "Heber", "Fredericksburg", "Deming", "Campbellsville", "Magnolia", "Spearfish", "Fallon", "Connersville", "Cordele", "Liberal", "Maryville", "Marshall", "Mitchell", "Elk City", "Levelland", "Pampa", "Arkadelphia", "Wahpeton", "Sterling", "Yankton", "Hood River", "Oskaloosa", "Dumas", "Brookings", "Raymondville", "Borger", "Pierre", "Beatrice", "Grenada", "Port Lavaca", "Guymon", "Worthington", "Parsons", "Price", "Evanston", "Jamestown", "Helena", "Prineville", "Storm Lake", "Woodward", "Portales", "Hereford", "Othello", "Los Alamos", "Huron", "Fitzgerald", "Maysville", "Snyder", "Winnemucca", "Vineyard Haven", "Spirit Lake", "Fairfield", "Atchison", "Spencer", "Andrews", "Sweetwater", "Zapata", "Vermillion", "Pecos", "Ketchikan", "Lamesa", "Vernon", "Craig"];

// var cities = ["Reading", "Hickory", "Beaumont", "Canton, Ohio", "Manchester", "Tallahassee", "Appleton", "Salem", "Anchorage", "Saginaw", "Salisbury", "Montgomery", "Trenton", "Erie", "Huntington", "Green Bay", "Eugene", "Ann Arbor", "Gainesville", "Ocala", "Naples", "Lincoln", "Lubbock", "Springfield", "Spartanburg", "Evansville", "Fort Collins", "Roanoke", "Kingsport", "Rocky Mount", "Wausau", "Boulder", "Utica", "Midland", "Medford", "Longview", "Fort Smith", "Amarillo", "Duluth", "Atlantic City", "San Luis Obispo", "Clarksville", "Norwich", "Kennewick", "Santa Cruz", "Tyler", "Bloomsburg", "Greeley", "Wilmington", "Merced", "Laredo", "Olympia", "Waco", "Hagerstown", "Lynchburg", "Bremerton", "Monroe", "Dothan", "Rochester", "Binghamton", "Crestview", "Harrisonburg"];


var categories = '4bf58dd8d48988d1d8941735,4bf58dd8d48988d11e941735,4bf58dd8d48988d11d941735,4bf58dd8d48988d116941735,4bf58dd8d48988d11e941735,4bf58dd8d48988d122941735,50327c8591d4c4b30a586d5d,4bf58dd8d48988d155941735,4bf58dd8d48988d118941735,4bf58dd8d48988d11b941735,4bf58dd8d48988d11f941735';

var geoBase = 'https://api.foursquare.com/v2/geo/geocode?locale=en&explicit-lang=false&v=20160908&autocomplete=true&allowCountry=false&wsid=BK0BYVYKVURU2TACZSJYCICEPO1V2Z&oauth_token=QEJ4AQPTMMNB413HGNZ5YDMJSHTOHZHMLZCAQCCLXIX41OMP&query=';
var searchBase = 'https://api.foursquare.com/v2/search/recommendations?locale=en&explicit-lang=false&v=20160908&m=foursquare&query=Nightlife&wsid=BK0BYVYKVURU2TACZSJYCICEPO1V2Z&oauth_token=QEJ4AQPTMMNB413HGNZ5YDMJSHTOHZHMLZCAQCCLXIX41OMP';
var suffix = 'v=20160908&wsid=BK0BYVYKVURU2TACZSJYCICEPO1V2Z&oauth_token=QEJ4AQPTMMNB413HGNZ5YDMJSHTOHZHMLZCAQCCLXIX41OMP';
/**
 * url : anyone of the prameters can fetch data, 
 * 
 */
function single(city, callback) {
    var items = [];
    var finalItems = [];
    /** geo */
    request({ url: geoBase + city, gzip: true, method: 'GET' }, function (err, resp, body) {
        // fs.writeFileSync('body.json', body);
        var rj = JSON.parse(body);
        var cts = rj.response.geocode.interpretations.items;
        var found = false;
        var ne = '';
        var sw = ''
        try {
            cts.forEach(function (c, index, array) {
                if (!found) {
                    if (c.feature.cc === 'US') {
                        ne = c.feature.geometry.bounds.ne.lat + ',' + c.feature.geometry.bounds.ne.lng;
                        sw = c.feature.geometry.bounds.sw.lat + ',' + c.feature.geometry.bounds.sw.lng;
                        found = true;
                    }
                }
                // var ne = rj.response.geocode.interpretations.items[0].feature.geometry.bounds.ne.lat + ',' + rj.response.geocode.interpretations.items[0].feature.geometry.bounds.ne.lng;
                // var sw = rj.response.geocode.interpretations.items[0].feature.geometry.bounds.sw.lat + ',' + rj.response.geocode.interpretations.items[0].feature.geometry.bounds.sw.lng;
            });
        } catch (error) {
            fs.appendFileSync('error.txt', 'Unexpected Error while geo ' + city + ' - ' + error + '\r\n\r\n');
            callback();
            return;
        }
        var searchUrl = searchBase + '&limit=25&offset=0&ne=' + ne + '&sw=' + sw;
        //limit=1000&offset=1000&intent=bestnearby&sw=37.73379707124429%2C-122.67917633056639&ne=37.80707148060925%2C-122.22049713134766&
        request({ url: searchUrl, method: 'GET', gzip: true },
            function (e, r, b) {
                if (e) console.log(e);
                var resJson = JSON.parse(b);
                // fs.writeFileSync('body.json', b);
                try {
                    var total = resJson.response.group.totalResults;
                } catch (error) {
                    fs.writeFileSync('error.txt', 'Unexpected Error while fetching ' + city + ' - ' + error + '\r\n\r\n');
                    callback();
                    return;
                }

                var offset = 0;

                var searchUrls = [];

                while (offset <= total) {
                    searchUrls.push(searchBase + '&limit=100&offset=' + offset + '&ne=' + ne + '&sw=' + sw);
                    offset = offset + 101;
                }
                // console.log(searchUrls);

                async.mapLimit(searchUrls, 1, function (su, scb) {
                    request({ url: su, method: 'GET', gzip: true }, function (err, resp, body) {
                        try {
                            var resJson = JSON.parse(body);
                            var sresults = resJson.response.group.results;
                            // console.log(sresults.length);
                            sresults.forEach(function (rec, index, array) {
                                if ((rec.displayType === 'venue') && (rec.venue.rating)) {
                                    items.push(rec);
                                }
                            });
                            scb();
                        } catch (error) {
                            fs.writeFileSync('error.txt', 'Unexpected Error while fetching ' + city + ' - ' + su + ' - ' + error + '\r\n\r\n');
                            scb();
                            return;
                        }
                    });
                }, function (err) {
                    // items.forEach(function (item, index, array) {
                    // console.log(items.length);

                    items.sort(compare('venue', 'rating'));

                    // items = items.slice(0, 2);

                    async.mapSeries(items, function (item, cb) {

                        // if (item.displayType !== 'venue') {
                        //     cb();
                        //     return;
                        // }
                        var id = item.venue.id;

                        var detailUrl = 'https://api.foursquare.com/v2/venues/' + id + '?' + suffix;

                        request({ url: detailUrl, gzip: true, method: 'GET' }, function (err, resp, body) {
                            fs.writeFileSync('body.json', body);
                            try {
                                var resJson = JSON.parse(body);
                                var venue = resJson.response.venue;
                                var name = venue.name;
                                var phone = venue.contact.phone;
                                var twitter = venue.contact.twitter;
                                var address = venue.location.address;
                                var lat = venue.location.lat;
                                var lng = venue.location.lng;
                                var neighborhood = venue.location.neighborhood;
                                var city_fetched = venue.location.city;
                                var state = venue.location.state;
                                var country = venue.location.country;
                                var canonicalUrl = venue.canonicalUrl;
                                var category = venue.categories[0].name;
                                var checkinsCount = venue.stats.checkinsCount;
                                var usersCount = venue.stats.usersCount;
                                var tipCount = venue.stats.tipCount;
                                var visitsCount = venue.stats.visitsCount;
                                var url = venue.url;
                                var tier = '';
                                var message = '';
                                var currency = '';
                                if (venue.price) {
                                    tier = venue.price.tier;
                                    message = venue.price.message;
                                    currency = venue.price.currency;
                                }
                                var rating = venue.rating;
                            } catch (parseError) {
                                fs.writeFileSync('error.txt', 'Unexpected Error while parsing ' + city + ' - ' + id + ' - ' + parseError + '\r\n\r\n');
                                cb();
                                return;
                            }
                            finalItems.push({ name: name, phone: phone, twitter: twitter, address: address, lat: lat, lng: lng, neighborhood: neighborhood, city_fetched: city, state: state, country: country, canonicalUrl: canonicalUrl, category: category, checkinsCount: checkinsCount, usersCount: usersCount, tipCount: tipCount, visitsCount: visitsCount, url: url, tier: tier, message: message, currency: currency, rating: rating });
                            // rows.push([name, phone, twitter, address, lat, lng, neighborhood, city_fetched, state, country, canonicalUrl, category, checkinsCount, usersCount, tipCount, visitsCount, url, tier, message, currency, rating, city]);
                            setTimeout(function () {
                                console.log(id + ' was done');
                                cb();
                            }, 3000);
                        });
                    }, function (err) {
                        if (err) console.log(err);
                        console.log(city + ' was done, length ' + finalItems.length);
                        fs.writeFileSync('usa/' + city + '.json', JSON.stringify(finalItems));
                        callback();
                    });
                });
            });
    });
}

process.on('exit', function () {
    // var buffer = ew.build([sheet]);
    // fs.writeFileSync('usaTop200.xlsx', buffer);
});

async.mapLimit(cities, 10, function (city, callback) {
    single(city, callback)
}, function (err) {
    if (err) console.log(err);
    console.log('everything was done');
    var buffer = ew.build([sheet]);
    fs.writeFileSync('usaTop200.xlsx', buffer);
});

/** sorting comparation, for Array.sort */
function compare(p1, p2) {
    return function (object1, object2) {
        var value1 = object1[p1][p2];
        var value2 = object2[p1][p2];
        if (value2 < value1) {
            return -1;
        }
        else if (value2 > value1) {
            return 1;
        }
        else {
            return 0;
        }
    }
}

// single('San Francisco', null);

// request({ url: 'https://en.wikipedia.org/wiki/List_of_metropolitan_areas_of_the_United_States', gzip: true, method: 'GET' }, function (err, resp, body) {
//     // console.log(body);
//     var $ = cheerio.load(body);
//     $('big').eq(0).parent('caption').parent('table').find('tr').each(function (index, element) {
//         if (index >= 200) {
//             fs.appendFileSync('cityremaining.txt', $(this).find('td').eq(2).text() + '\r\n');
//         }
//         //     var city = $(this).find('td').eq(2).text();
//         //     // fs.appendFileSync('city.txt', city + '\r\n');
//         //     var searchZip = 'http://www.unitedstateszipcodes.org/';
//         //     request({ url: searchZip, gzip: true, method: 'POST', form: { q: city } }, function (e, r, b) {
//         //         var $ = cheerio.load(b);
//         //         var populated = $('#map-info small span a').text();
//         //         fs.appendFileSync('mostPopulatedZips.txt', populated + '\r\n');
//         //         // $('.table-condensed').eq(1).find('tr').each(function (index, element) {
//         //         //     var finalZip = $(this).find('td').eq(0).find('a').text();
//         //         //     fs.appendFileSync('zips.txt', finalZip + '\r\n');
//         //         // });
//         //     });
//         // }
//     });
// });

// request({ url: 'https://en.wikipedia.org/wiki/Metropolitan_regions_of_China', gzip: true, method: 'GET' }, function (err, resp, body) {
//     var $ = cheerio.load(body);
//     $('.wikitable').eq(0).find('tr').each(function (index, element) {
//         $(this).find('td').eq(2).find('a').each(function(index, element) {
//             fs.appendFileSync('UKCities.txt', $(this).text() + '\r\n');
//         });
//     });
// });