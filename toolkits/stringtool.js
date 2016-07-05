
/**
 * Fetch all email dress from a string. Return an array
 */
module.exports.fetchAllMailAddress = function (str) {
    return str.match(/(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})/ig);
}

/**
 * @param size count of numbers
 * @return fetched number
 * fetch number from string
 */
module.exports.fetchNumbersFromString = function(str, size) {
    var regexp = '\\d{' + size + '}';
    return str.match(regexp) ? str.match(regexp)[0] : null;
}   


/**
 * Get a random string via length provided
 */
module.exports.randomStr = function (len) {
    len = len || 32;
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    var maxPos = $chars.length;
    var pwd = '';
    for (i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}
