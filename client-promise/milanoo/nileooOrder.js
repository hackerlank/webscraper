/// <reference path="../../include.d.ts" />

const Promise = require('bluebird');
const request = require('request');
// const requestAsync = Promise.promisify(request); // This is what bluebird saves you
const fs = require('fs');


var headers = {
    'Connection': 'keep-alive',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Accept-Encoding': 'gzip, deflate',
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.116 Safari/537.36',
    'Upgrade-Insecure-Requests': 1,
    'Content-Type': 'application/vnd.ms-excel'
};

var readerStream = fs.createReadStream('nileoo_oder_member.xls');


var formData = {
    fileData: readerStream
}

var uploadFileUrl = 'http://192.168.11.13:8080/fs/nileooFile/uploadNileooLogistics.htm';


var req = request.defaults({ proxy: 'http://127.0.0.1:8888' });

req.post({ url: uploadFileUrl, formData: formData }, function (error, resp, body) {
    console.log(body);
});