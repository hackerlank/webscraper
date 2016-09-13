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
// var cities = ["London, Kentucky","Shawnee, Oklahoma","Barre, Vermont","Nogales, Arizona","Cañon City","Seymour, Indiana","Española, New Mexico","Summit Park, Utah","Elkins, West Virginia","Middlesborough, Kentucky","Price, Utah","Craig, Colorado"];
var cities = ["London","Reading","Southend","Medway","Luton","Farnborough","Slough","High Wycombe","Woking","Basildon","Maidstone","Chelmsford","Crawley","Basingstoke","Bracknell","Ascot","Guildford","Hemel Hempstead","Harlow","Stevenage","Maidenhead","Aylesbury","Gravesend","Sittingbourne","St. Albans","Tunbridge Wells","Horsham","Braintree","Cheshunt","Brentwood","Welwyn Garden City","Reigate","Redhill","Tonbridge","Bishop's Stortford","Grays","Letchworth","Windsor","Hitchin","Harpenden","Sevenoaks","Hatfield","East Grinstead","Hertford","Chesham","Hoddesdon","Ware","Berkhamsted","Amersham","Sheerness","Beaconsfield","Dorking","Birmingham-Wolverhampton","Coventry","Nuneaton","Cannock","Warwick","Leamington","Tamworth","Rugby","Lichfield","Rugeley","Kenilworth","Atherstone","Southam","Alcester","Greater Manchester Urban Area","Macclesfield","Glossop","Marple","Rawtenstall","Buxton","Northwich","Haslingden","Knutsford","Bacup","New Mills","Chapel-en-le-Frith","Leeds","Bradford","Huddersfield","Halifax","Wakefield","Castleford","Pontefract","Harrogate","Keighley","Dewsbury","Holmfirth","Knaresborough","Ilkley","Skipton","Otley","Wetherby","Liverpool Urban Area","Birkenhead Urban Area","Wigan","Ashton","Warrington","Widnes","Runcorn","Chester","Southport","Skelmersdale","Ormskirk","Glasgow","East Kilbride","Greenock","Motherwell","Wishaw","Hamilton","Cumbernauld","Kilmarnock","Dumbarton","Kirkintilloch","Carluke","Helensburgh","Larkhall","Lanark","Kilbirnie","Strathaven","Beith","Lesmahagow","Newcastle","Sunderland","Durham","Blyth","Houghton-le-Spring","Stanley","Cramlington","Ashington","Consett","Chester-le-Street","Peterlee","Seaham","Bedlington","Morpeth","Hexham","Prudhoe","Ponteland","Corbridge","Sheffield","Barnsley","Dearne Valley","Doncaster","Chesterfield","Rotherham","Worksop","Dronfield","Thorne","Maltby","Hatfield","Conisbrough","Mexborough","Bolsover","Dinnington","Eckington","Stocksbridge","Chapeltown","Penistone","Killamarsh","Clay Cross","Clowne","Tickhill","Bawtry","Portsmouth","Southampton","Havant","Waterlooville","Fareham","Gosport","Bognor Regis","Winchester","Chichester","Hythe","Romsey","Petersfield","Selsey","Bishop's Waltham","New Alresford","Lyndhurst","Nottingham","Derby","Mansfield","Burton upon Trent","Grantham","Ilkeston","Newark","Alfreton","Heanor","Belper","Ripley","Eastwood","Shirebrook","Warsop","Bingham","Radcliffe-on-Trent","Southwell","Ashbourne","Castle Donington","Bottesford","Kegworth","Cardiff","Newport","Cynon Valley","Merthyr Tydfil","Rhondda Valley","Barry","Bridgend","Cwmbran","Pontypool","Pontypridd","Ebbw Vale","Brynmawr","Caerphilly","Ystrad Mynach","Ebbw Vale","Maesteg","Porthcawl","Tredegar","Chepstow","Monmouth","Tonyrefail","Dalgety Bay","Abergavenny","Llantwit Major","Rhymney","Pencoed","Pyle","Treharris","Magor","Blaenavon","Cowbridge","Usk","Pontycymer","Edinburgh","Livingston","Dunfermline","Kirkcaldy","Glenrothes","Levenmouth","Musselburgh","Bathgate","Bonnyrigg","Penicuik","Broxburn","Linlithgow","Dalkeith","Dunbar","Cowdenbeath","Whitburn","Armadale","Haddington","Queensferry","Tranent","Prestonpans","Loanhead","Gorebridge","Bristol","Bath","Weston-super-Mare","Chippenham","Yate","Trowbridge","Frome","Clevedon","Portishead","Radstock","Midsomer Norton","Burnham-on-Sea","Warminster","Nailsea","Melksham","Westbury","Corsham","Thornbury","Wells","Shepton Mallet","Cheddar","Wotton-under-Edge","Belfast","Craigavon","Bangor","Larne","Newtownards","Carrickfergus","Antrim","Ballyclare","Comber","Dromore","Carryduff","Randalstown","Moira","Brighton","Worthing","Littlehampton","Eastbourne","Bognor Regis","Burgess Hill","Seaford","Haywards Heath","Hailsham","Lewes","Uckfield","Peacehaven","Newhaven","Steyning","Arundel","Leicester","Loughborough","Shepshed","Hinckley","Earl Shilton","Coalville","Melton Mowbray","Market Harborough","Ashby-de-la-Zouch","Lutterworth","Middlesbrough","Darlington","Hartlepool","Newton Aycliffe","Spennymoor","Guisborough","Northallerton","Bishop Auckland","Catterick Garrison","Richmond","Sedgefield","Barnard Castle","Stokesley","Great Ayton","Stoke-on-Trent","Crewe","Winsford","Congleton","Leek","Biddulph","Sandbach","Nantwich","Stone","Middlewich","Uttoxeter","Alsager","Market Drayton","Cheadle","Holmes Chapel","Loggerheads","Bournemouth-Poole","Ferndown","Lymington","Verwood","Ringwood","Blandford Forum","Wareham","West Moors","Wimborne Minster","Leonards and St Ives","Fordingbridge","Milford on Sea","Bransgore","Lytchett Matravers","Bere Regis","Northampton","Kettering","Wellingborough","Corby","Rushden","Daventry","Irthlingborough","Towcester","Thrapston","Swansea","Neath-Port Talbot","Llanelli","Ystradgynlais","Pontarddulais","Ammanford","Burry Port","Norwich","Great Yarmouth","Lowestoft","Dereham","Wymondham","Attleborough","Beccles","Hethersett","Aylsham","Bungay","Kessingland","Mulbarton","Long Stratton","Brundall","Spixworth","Horsford","Acle","Mattishall","Blofield","Wroxham","Hull","Beverley","Goole","Barton-upon-Humber","Hornsea","Brough","Hedon","Withernsea","Market Weighton","South Cave","Howden","Swanland","North Ferriby","Barrow upon Humber","Thorngumbald","Keyingham","Levan","Preston","Leyland","Chorley","Longridge","Garstang","Burnley","Blackburn","Accrington","Clitheroe","Barnoldswick","Earby","Oxford","Bicester","Abingdon","Witney","Didcot","Carterton","Brackley","Thame","Wantage","Wallingford","Chipping Norton","Woodstock","Charlbury","Watlington","Burford","Peterborough","Spalding","Stamford","March","Whittlesey","Bourne","Oakham","Yaxley","Oundle","Market Deeping","Ramsey","Sawtry","Uppingham","Crowland","Stilton","Alconbury","Wittering","Cambridge","Haverhill","Huntingdon","Newmarket","Ely","Royston","Saffron Walden","St Ives","Soham","Cambourne","Sawston","Cottenham","Godmanchester","Burwell","Bar Hill","Linton","Fenstanton","Papworth Everard","Longstanton","Stapleford","Plymouth","Saltash","Tavistock","Ivybridge","Liskeard","Torpoint","Callington","South Brent","Gloucester","Cheltenham","Stroud","Tewkesbury","Bishop's Cleeve","Cinderford","Dursley","Winchcombe","Newent","Mitcheldean","Aberdeen","Stonehaven","Inverurie","Westhill","Ellon","Portlethen","Banchory","Dyce","Kintore","Peterculter","Newtonhill","Oldmeldrum","Milton Keynes","Leighton Buzzard","Flitwick","Buckingham","Ampthill","Winslow","Swindon","Cirencester","Calne","Devizes","Royal Wootton Bassett","Marlborough","Highworth","Faringdon","Hungerford","Malmesbury","Cricklade","Lechlade","Blackpool","Fleetwood","Kirkham","Falkirk","Stirling","Clackmannanshire","Margate-Ramsgate-Broadstairs","Herne Bay","Whitstable","Canterbury","Faversham","Sandwich","Telford","Shrewsbury","Newport","Bridgnorth","Shifnal","Church Stretton","Wem","Albrighton","Much Wenlock","Pontesbury","Colchester","Clacton-on-Sea","Sudbury","Frinton and Walton","Harwich","Halstead","Tiptree","Brightlingsea","Mersea Island","Coggeshall","Manningtree","Exeter","Exmouth","Tiverton","Sidmouth","Honiton","Dawlish","Crediton","Cullompton","Ottery St Mary","Budleigh Salterton","Chudleigh","Topsham","Crankbrook","Exminster","Moretonhampstead","York","Selby","Malton","Norton","Pocklington","Tadcaster","Easingwold","Stamford Bridge","Ipswich","Felixstowe","Stowmarket","Hadleigh","Leiston","Needham Market","Saxmundham","Capel St. Mary","Framlingham","Aldeburgh","Wickham Market","Debenham","Torbay","Newton Abbott","Teignmouth","Totnes","Bovey Tracey","Ashburton","Kingskerswell","Buckfastleigh","Bishopsteignton","Ashford","Folkestone","Hythe","Dover","Deal","Tenterden","New Romney","Lydd","Dundee","Arbroath","Forfar","Carnoustie","Newport-on-Tay","Kirriemuir","Coupar Angus","Inchture","Lincoln","Gainsborough","Sleaford","Horncastle","Ruskington","Woodhall Spa","Saxilby","Branston","Nettleham","Welton","Cherry Willingham","Market Rasen","Skellingthorpe","Washingborough","Collingham","Metheringham","Wragby","Navenby","Bedford","St Neots","Biggleswade","Sandy","Shefford","Bromham","Grimsby","Cleethorpes","Louth","Immingham","Caistor","Laceby","Keelby","Taunton","Bridgwater","Wellington","Chard","Street","Glastonbury","Ilminster","Wiveliscombe","Langport","Hastings","Bexhill","Rye","Battle","Robertsbridge","Winchelsea","Barnstaple","Bideford","Ilfracombe","Braunton","Northam","South Molton","Appledore","Great Torrington","Weymouth","Dorchester","Bridport","Charminster","Yeovil","Gillingham","Sherborne","Shaftesbury","Crewkerne","Wincanton","Somerton","Bruton","Stalbridge","Beaminster","Castle Cary","Ilchester","Andover","Tidworth","Whitchurch","Ludgershall","Newbury","Hungerford","Kingsclere","Salisbury","Amesbury","Durrington","Downton","Alderbury"];
var remainingCities = cities;

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
        fs.appendFileSync('body.json', body + '\r\n\r\n\r\n');
        try {
            var rj = JSON.parse(body);
            var cts = rj.response.geocode.interpretations.items;
            var found = false;
            var ne = '';
            var sw = ''
            cts.forEach(function (c, index, array) {
                if (!found) {
                    if (c.feature.cc === 'GB') {
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
                    fs.appendFileSync('error.txt', 'Unexpected Error while fetching ' + city + ' - ' + error + '\r\n\r\n');
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
                            fs.appendFileSync('error.txt', 'Unexpected Error while fetching ' + city + ' - ' + su + ' - ' + error + '\r\n\r\n');
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
                            // fs.writeFileSync('body.json', body);
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
                                fs.appendFileSync('error.txt', 'Unexpected Error while parsing ' + city + ' - ' + id + ' - ' + parseError + '\r\n\r\n');
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
                        fs.writeFileSync('uk/' + city + '.json', JSON.stringify(finalItems));
                        var cindex = remainingCities.indexOf(city);
                        remainingCities = remainingCities.slice(0, cindex).concat(remainingCities.slice(cindex + 1));
                        callback();
                    });
                });
            });
    });
}

process.on('exit', function () {
    fs.writeFileSync('remainingCities.txt', remainingCities);
    // var buffer = ew.build([sheet]);
    // fs.writeFileSync('usaTop200.xlsx', buffer);
});

async.mapLimit(cities, 10, function (city, callback) {
    single(city, callback)
}, function (err) {
    if (err) console.log(err);
    console.log('everything was done');
    // var buffer = ew.build([sheet]);
    // fs.writeFileSync('usaTop200.xlsx', buffer);
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