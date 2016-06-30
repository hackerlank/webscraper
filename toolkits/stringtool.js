
/**
 * Fetch all email dress from a string. Return an array
 */
module.exports.fetchAllMailAddress = function(str) {
    return str.match(/(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})/ig);
}